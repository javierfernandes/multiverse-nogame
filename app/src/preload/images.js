import { Image } from '../constants'

export const images = game => {
  game.load.image(Image.sky, 'assets/sky.png')
  game.load.image(Image.ground, 'assets/platform.png')
  game.load.image(Image.star, 'assets/star.png')
  game.load.image(Image.ledge, 'assets/ledge.png')

  game.load.spritesheet(Image.dude, 'assets/dude.png', 32, 48)

  game.load.spritesheet(Image.eskimo, 'assets/images/eskimo.png', 16, 24)
}