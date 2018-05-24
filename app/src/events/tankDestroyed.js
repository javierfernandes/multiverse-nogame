import { without } from 'ramda'

export const tankDestroyed = (getParts, getState) => (tank, bullet) => {
  const { sounds: { tankDestroyed } } = getParts()
  const state = getState()

  tankDestroyed.play()

  // state change
  state.tanks = without([tank.position], state.tanks)

  // side-effect on UI
  tank.figure.kill()
  bullet.kill()
}