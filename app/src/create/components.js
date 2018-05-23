import Score from '../components/Score'
import Tank, { Position } from '../components/Tank'
import Bullet from '../components/Bullet'
import Borders from '../components/Borders'

export const components = (game, getParts, getState) => ({
  components: [
    instantiate(game, getState)(Borders),
    instantiate(game, getState)(Score),
    instantiate(game, getState)(Tank, Position.BOTTOM),
    instantiate(game, getState)(Tank, Position.RIGHT),
    instantiate(game, getState)(Tank, Position.LEFT),
    instantiate(game, getState)(Tank, Position.TOP),
    instantiate(game, getState)(Bullet)
  ]
})

const instantiate = (game, getState) => (Component, ...args) => {
  const p = new Component(...args)
  p.game = game
  p.getState = getState
  const f = p.create()
  p.figure = f
  return p
}