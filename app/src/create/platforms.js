import { Image } from '../constants'

const createLedge = (x, y, p, game) => {
  const ledge = p.create(x, y, Image.ground)
  ledge.body.immovable = true
  ledge.body.velocity.x = 200
  ledge.body.gravity.x = 0
  return ledge
}

export const platforms = game => {
  const p = game.add.group()
  p.enableBody = true

  const ground = p.create(0, game.world.height - 64, Image.ground)
  ground.scale.setTo(2, 2)
  ground.body.immovable = true

  return {
    platforms: p,
    ledge1: createLedge(400, 455, p, game),
    ledge2: createLedge(-150, 375, p, game)
  }
}