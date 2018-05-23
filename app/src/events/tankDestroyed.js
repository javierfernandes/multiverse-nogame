
export const tankDestroyed = (getParts, getState) => (tank, bullet) => {
  const { sounds: { tankDestroyed } } = getParts()

  tankDestroyed.play()

  tank.kill()
  bullet.kill()
}