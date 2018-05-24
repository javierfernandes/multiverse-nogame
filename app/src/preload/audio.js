import { Audio } from '../constants'
import { values } from 'ramda'

const folder = 'assets/audio/'

export const audio = game => {
  values(Audio).map(name => [name, `${folder}${name}.wav`])
    .forEach(([name, file]) => game.load.audio(name, file))
}