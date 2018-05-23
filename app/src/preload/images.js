import { Image } from '../constants'

export const images = game => {
  game.load.image(Image.sky, 'assets/images/sky.png')
  game.load.image(Image.ground, 'assets/images/platform.png')
  game.load.image(Image.star, 'assets/images/star.png')
  game.load.image(Image.ledge, 'assets/images/ledge.png')

  game.load.spritesheet(Image.dude, 'assets/images/dude.png', 32, 48)

  game.load.spritesheet(Image.eskimo, 'assets/images/eskimo.png', 16, 24)

  game.load.spritesheet(Image.tank, 'assets/images/tank.gif', 32, 32)
  game.load.image(Image.bullet, 'assets/images/bullet.png')
}