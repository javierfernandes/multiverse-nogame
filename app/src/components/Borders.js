import { Image } from '../constants'

export default class Borders {
  create() {
    const { width, height } = this.game.world
    const p = this.game.add.group()
    p.enableBody = true

    const create = (x, y) => {
      const block = p.create(x, y, Image.ground)
      block.scale.setTo(2, 2)
      block.body.immovable = true
      return block
    }

    create(0, 0) // top
    create(0, height - 64) // bottom
    create(64, 64).angle = 90 // left
    create(width, 0).angle = 90 // right

    return p
  }
  update() {}
}