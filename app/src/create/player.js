import { Image } from '../constants'

export const player = game => {
  const p = game.add.sprite(32, game.world.height - 150, Image.eskimo, 0)
  p.scale.setTo(3, 3)

  game.physics.arcade.enable(p)
  p.body.bounce.y = 0.2
  p.body.gravity.y = 300
  p.body.collideWorldBounds = true

  p.animations.add('left', [0, 1, 2, 3], 10, true)
  p.animations.add('right', [7, 6, 5, 4], 10, true)

  return { player: p }
}