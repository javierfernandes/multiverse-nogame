import { Position } from '../components/Tank'

export const tankFired = (getParts, getState) => (tank, bullet) => {
  // play sound
  const { collectStarSound } = getParts()
  collectStarSound.play()

  // mutate state
  const state = getState()
  state.firingTank = nextPosition[tank.position]
}

const nextPosition = {
  [Position.BOTTOM]: Position.LEFT,
  [Position.TOP]: Position.RIGHT,
  [Position.LEFT]: Position.TOP,
  [Position.RIGHT]: Position.BOTTOM
}