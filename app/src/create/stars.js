import { range } from 'ramda'
import { Image } from '../constants'

export const stars = game => {
  const group = game.add.group()
  group.enableBody = true

  range(0, 12).forEach(i => {
    const star = group.create(i * 70, 0, Image.star)
    star.body.gravity.y = 300
    star.body.bounce.y = 0.7 + Math.random() * 0.2

    star.body.collideWorldBounds = true
  })
  return { stars: group }
}