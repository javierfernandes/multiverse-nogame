import { Position, SIZE } from './Tank'

Phaser.Group.prototype.setAll = function (key, value, checkAlive, checkVisible, operation, force) {
  if (checkAlive === undefined) { checkAlive = false }
  if (checkVisible === undefined) { checkVisible = false }
  if (force === undefined) { force = false }

  key = key.split('.')
  operation = operation || 0

  for (var i = 0; i < this.children.length; i++) {
    if ((!checkAlive || (checkAlive && this.children[i].alive)) && (!checkVisible || (checkVisible && this.children[i].visible))) {
      this.setProperty(this.children[i], key, value, operation, force)
    }
  }
}

export default class Bullet {
  constructor() {
    this.type = 'bullets'
  }
  create() {
    const lasers = this.game.add.group()
    lasers.enableBody = true
    lasers.createMultiple(20, 'bullet')

    const kill = b => b.kill()

    lasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', kill)
    // lasers.callAll('anchor.setTo', 'anchor', 0.5, 1.0)
    lasers.setAll('checkWorldBounds', true)

    // keyboard
    const keys = [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.ENTER]
    this.phaserKeys = this.game.input.keyboard.addKeys(keys)
    // Capture these keys to stop the browser from receiving this event
    this.game.input.keyboard.addKeyCapture(keys)

    return lasers
  }

  update({ components }) {
    if (this.game.input.activePointer.isDown) {
      if (!this.mouseTouchDown) {
        this.touchDown(components)
      }
    } else {
      if (this.mouseTouchDown) {
        this.touchUp()
      }
    }

    // keyboard
    for (var index in this.phaserKeys) {
      var key = this.phaserKeys[index]
      if (key.justDown) {
        this.fireLaser(components)
      }
    }
  }

  touchDown(components) {
    this.mouseTouchDown = true
    this.fireLaser(components)
  }

  touchUp() {
    this.mouseTouchDown = false
  }

  fireLaser(components) {
    const { firingTank } = this.getState()

    // bullets from all tanks
    // components.filter(c => c.id === 'tank').forEach(this.fireTank)

    const tank = components.find(c => c.id === 'tank' && c.position === firingTank)
    this.fireTank(tank)
  }

  fireTank(c) {
    const { figure: tank } = c
    const laser = this.figure.getFirstExists(false)
    if (laser) {
      const [dx, dy] = OffSets[c.position](tank, laser)
      const [vx, vy] = Velocities[c.position]
      laser.reset(dx, dy)

      laser.body.velocity.x = vx
      laser.body.velocity.y = vy

      this.getParts().events.tankFired(c, laser)
    }
  }

}

const VELOCITY = 500
const Velocities = {
  [Position.BOTTOM]: [0, -VELOCITY],
  [Position.TOP]: [0, VELOCITY],
  [Position.LEFT]: [VELOCITY * (1 + 600 / 800), 0],
  [Position.RIGHT]: [-(VELOCITY * 1 + (600 / 800)), 0]
}

// const OFFSET = (SIZE / 2) * 1.1
const OFFSET = SIZE
const OffSets = {
  [Position.BOTTOM]: (tank, laser) => [tank.x - (laser.width / 2), tank.y - OFFSET],
  [Position.TOP]: (tank, laser) => [tank.x - (laser.width / 2), tank.y + OFFSET],

  [Position.LEFT]: (tank, laser) => [tank.x + OFFSET, tank.y - (laser.width / 2)],
  [Position.RIGHT]: (tank, laser) => [tank.x - OFFSET, tank.y - (laser.width / 2)]
}