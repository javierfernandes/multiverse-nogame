import Player from '../components/Player'
import Score from '../components/Score'

const classes = [
  Player,
  Score
]

export const components = (game, getParts, getState) => ({
  components: classes.map(instantiate(game, getState))
})

const instantiate = (game, getState) => Component => {
  const p = new Component()
  p.game = game
  p.getState = getState
  const f = p.create()
  p.figure = f
  return p
}