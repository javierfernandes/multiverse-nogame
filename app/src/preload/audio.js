import { Audio } from '../constants'

export const audio = game => {
  game.load.audio(Audio.background, ['assets/audio/background.wav'])
  game.load.audio(Audio.jump, ['assets/audio/jump.wav'])
  game.load.audio(Audio.collectStar, ['assets/audio/collect-star.wav'])
  game.load.audio(Audio.stageClear, ['assets/audio/stageClear.wav'])
}