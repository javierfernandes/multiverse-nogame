import { Audio } from '../constants'

export const audio = game => {
  const backgroundSound = game.add.audio(Audio.background, 0.5, true)
  backgroundSound.play()

  return {
    backgroundSound,
    jumpSound: game.add.audio(Audio.jump),
    collectStarSound: game.add.audio(Audio.collectStar),
    stageClearSound: game.add.audio(Audio.stageClear)
  }
}