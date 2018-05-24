import { Image } from '../constants'

export const Position = {
  BOTTOM: 'bottom',
  TOP: 'top',
  LEFT: 'left',
  RIGHT: 'right'
}
export const SIZE = 64
const HALF_SIZE = SIZE / 2
const MARGIN = SIZE * 1.5

export default class Tank {
  constructor(position) {
    this.id = 'tank'
    this.position = position

    this.tankDestroyed = Object.bind(this, this.tankDestroyed)
  }

  getInitialPosition() {
    const { height, width } = this.game
    const verticalMiddle = height / 2 - HALF_SIZE
    const horizontalMiddle = width / 2 - HALF_SIZE
    switch (this.position) {
      case Position.TOP: return [width / 2, HALF_SIZE]
      case Position.BOTTOM: return [horizontalMiddle + HALF_SIZE, height - HALF_SIZE]
      case Position.LEFT: return [HALF_SIZE, verticalMiddle + HALF_SIZE]
      case Position.RIGHT: return [width - HALF_SIZE, verticalMiddle + HALF_SIZE]
      default: throw new Error('No position set !')
    }
  }

  getAngle() {
    switch (this.position) {
      case Position.BOTTOM: return 0
      case Position.TOP: return 0
      case Position.LEFT: return 90
      case Position.RIGHT: return 270
      default: throw new Error('No position set !')
    }
  }

  create() {
    const [x, y] = this.getInitialPosition()
    const p = this.game.add.sprite(x, y, Image.tank, 0)

    p.scale.setTo(2, 2)
    p.anchor.setTo(0.5, 0.5)
    if (this.position === Position.TOP) { p.scale.y *= -1 }
    if (this.position === Position.LEFT) { p.scale.x *= -1 }

    p.angle = this.getAngle()

    // physics
    this.game.physics.arcade.enable(p)
    p.body.immovable = true

    this.cursors = this.game.input.keyboard.createCursorKeys()

    return p
  }
  
  destroyed(figure, bullet) {
    const { events } = this.getParts()
    events.tankDestroyed(this, bullet)
  }

  update({ components, events }) {
    const bullets = components.find(c => c.type === 'bullets')
    this.game.physics.arcade.overlap(this.figure, bullets.figure, this.destroyed, null, this)

    // movement
    this.figure.body.velocity.x = 0
    this.figure.body.velocity.y = 0

    if (this.position === Position.TOP || this.position === Position.BOTTOM) {
      this.updateHorizontal()
    } else {
      this.updateVertical()
    }
  }

  updateHorizontal() {
    const { width: worldWidth } = this.game.world
    const { x } = this.figure

    if (this.cursors.left.isDown && x > MARGIN) {
      this.figure.body.velocity.x = -150
    } else if (this.cursors.right.isDown && (x + MARGIN) < worldWidth) {
      this.figure.body.velocity.x = 150
    } else {
      this.figure.frame = 0
    }
  }

  updateVertical() {
    const { height: worldHeight } = this.game.world
    const { y } = this.figure

    if (this.cursors.up.isDown && y > MARGIN) {
      this.figure.body.velocity.y = -150
    } else if (this.cursors.down.isDown && (y + MARGIN) < worldHeight) {
      this.figure.body.velocity.y = 150
    } else {
      this.figure.frame = 0
    }
  }

}