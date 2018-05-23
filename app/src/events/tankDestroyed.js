
export const tankDestroyed = (getParts, getState) => (tank, bullet) => {
  const { collectStarSound } = getParts()

  collectStarSound.play()

  tank.kill()
  bullet.kill()
}