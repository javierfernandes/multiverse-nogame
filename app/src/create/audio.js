import { mapObjIndexed, omit } from 'ramda'
import { Audio } from '../constants'

export const audio = game => {
  const backgroundSound = game.add.audio(Audio.background, 0.5, true)

  // this has side effect, should be an action or event like "gameStarted"
  backgroundSound.play()

  return {
    sounds: mapObjIndexed(value => game.add.audio(value), omit('background', Audio))
  }
}
