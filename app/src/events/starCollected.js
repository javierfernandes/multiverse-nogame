
export const starCollected = (getParts, getState) => (player, star) => {
  const { sounds: { collectStar, stageClear } } = getParts()
  const state = getState();

  (state.collectedStars === 11 ? stageClear : collectStar).play()

  star.kill()

  // TODO: design an immutable solution
  state.score += 10
  state.collectedStars += 1
}