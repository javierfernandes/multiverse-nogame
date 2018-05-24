import { values, apply, flip } from 'ramda'
import * as updates from './all'

const flippedApply = flip(apply)

export default (parts, game) => {
  values(updates).forEach(flippedApply([parts, game]))
}