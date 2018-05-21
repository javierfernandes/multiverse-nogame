import { Image } from '../constants'

export default class Player {

  constructor() {
    this.state = {
      direction: 'right'
    }
  }

  create() {
    const p = this.game.add.sprite(32, this.game.world.height - 150, Image.eskimo, 0)
    p.scale.setTo(3, 3)

    this.game.physics.arcade.enable(p)
    p.body.bounce.y = 0.2
    p.body.gravity.y = 300
    p.body.collideWorldBounds = true

    p.animations.add('left', [0, 1, 2, 3], 10, true)
    p.animations.add('right', [7, 6, 5, 4], 10, true)

    this.cursors = this.game.input.keyboard.createCursorKeys()
    return p
  }

  update({ stars, platforms, events }) {
    // physics
    this.game.physics.arcade.collide(this.figure, platforms)
    this.game.physics.arcade.collide(stars, platforms)
    this.game.physics.arcade.overlap(this.figure, stars, events.starCollected, null, this)

    // movement
    this.figure.body.velocity.x = 0

    if (this.cursors.left.isDown) {
      this.state.direction = 'left'
      this.figure.body.velocity.x = -150
      this.figure.animations.play('left')
    } else if (this.cursors.right.isDown) {
      this.state.direction = 'right'
      this.figure.body.velocity.x = 150
      this.figure.animations.play('right')
    } else {
      this.figure.animations.stop()
      this.figure.frame = this.state.direction === 'left' ? 0 : 7
    }

    if (this.cursors.up.isDown && this.figure.body.touching.down) {
      events.playerJumps()
      this.figure.body.velocity.y = -225
    }
  }
}