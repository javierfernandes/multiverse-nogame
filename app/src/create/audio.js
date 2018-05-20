import { Audio } from '../constants'

export const audio = game => {
  const backgroundSound = game.add.audio(Audio.background, 0.5, true)
  backgroundSound.play()

  const jumpSound = game.add.audio(Audio.jump)
  const collectStarSound = game.add.audio(Audio.collectStar)

  return {
    backgroundSound,
    jumpSound,
    collectStarSound
  }
}