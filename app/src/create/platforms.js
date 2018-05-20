import { Image } from '../constants'

export const platforms = game => {
  const p = game.add.group()
  p.enableBody = true

  const ground = p.create(0, game.world.height - 64, Image.ground)
  ground.scale.setTo(2, 2)
  ground.body.immovable = true

  const ledge1 = p.create(400, 400, Image.ground)
  ledge1.body.immovable = true
  const ledge2 = p.create(-150, 250, Image.ground)
  ledge2.body.immovable = true

  return { platforms: p }
}