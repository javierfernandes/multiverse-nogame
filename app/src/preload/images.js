import { Image } from '../constants'

export const images = game => {
  game.load.image(Image.sky, 'assets/images/sky.png')
  game.load.image(Image.border, 'assets/images/border.png')
  game.load.spritesheet(Image.tank, 'assets/images/tank.gif', 32, 32)
  game.load.image(Image.bullet, 'assets/images/bullet.png')
}