import { Image } from '../constants'

const createLedge = (w, h, p) => {
  const ledge = p.create(w, h, Image.ground)
  ledge.body.immovable = true
}

export const platforms = game => {
  const p = game.add.group()
  p.enableBody = true

  const ground = p.create(0, game.world.height - 64, Image.ground)
  ground.scale.setTo(2, 2)
  ground.body.immovable = true

  createLedge(400, 400, p)
  createLedge(-150, 250, p)

  return { platforms: p }
}