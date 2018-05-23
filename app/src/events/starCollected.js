
export const starCollected = (getParts, getState) => (player, star) => {
  const { collectStarSound, stageClearSound } = getParts()
  const state = getState()

  if (state.collectedStars === 11) {
    stageClearSound.play()
  } else {
    collectStarSound.play()
  }

  star.kill()

  // TODO: design an immutable solution
  state.score += 10
  state.collectedStars += 1
}