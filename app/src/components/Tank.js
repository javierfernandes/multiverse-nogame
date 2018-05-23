import { Image } from '../constants'

export const Position = {
  BOTTOM: 'bottom',
  TOP: 'top',
  LEFT: 'left',
  RIGHT: 'right'
}
const SIZE = 64
const HALF_SIZE = SIZE / 2

export default class Tank {
  constructor(position) {
    this.id = 'tank'
    this.position = position
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

  update({ stars, platforms, events }) {
    const { width: worldWidth } = this.game.world
    const { x, width } = this.figure

    this.figure.body.velocity.x = 0

    if (this.cursors.left.isDown && x > 0) {
      this.figure.body.velocity.x = -150
    } else if (this.cursors.right.isDown && (x + width) < worldWidth) {
      this.figure.body.velocity.x = 150
    } else {
      this.figure.frame = 0
    }
  }

}