
export const tankFired = (getParts, getState) => (tank, bullet) => {
  // play sound
  const { sounds: { bulletFired } } = getParts()
  bulletFired.play()

  // mutate state
  const state = getState()
  state.firingTank = nextTank(state.tanks, tank.position)
}

const nextTank = (tanks, current) => {
  const i = tanks.indexOf(current)
  const nextI = (i + 1) % tanks.length
  return tanks[nextI]
}
