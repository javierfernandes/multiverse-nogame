
export const starCollected = (getParts, getState) => (player, star) => {
  const { collectStarSound, scoreText } = getParts()

  collectStarSound.play()

  star.kill()

  // TODO: design an immutable solution
  const state = getState()
  state.score += 10
  scoreText.text = `Score: ${state.score}`
}