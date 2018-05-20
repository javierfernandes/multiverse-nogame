import { Image } from '../constants'

export const player = game => {
  const p = game.add.sprite(32, game.world.height - 150, Image.dude)
  game.physics.arcade.enable(p)
  p.body.bounce.y = 0.2
  p.body.gravity.y = 300
  p.body.collideWorldBounds = true

  p.animations.add('left', [0, 1, 2, 3], 10, true)
  p.animations.add('right', [5, 6, 7, 8], 10, true)

  return { player: p }
}