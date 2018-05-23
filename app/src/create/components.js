import Score from '../components/Score'
import Tank, { Position } from '../components/Tank'
import Bullet from '../components/Bullet'
import Borders from '../components/Borders'

export const components = (game, getParts, getState) => {
  const create = instantiate(game, getState, getParts)
  return {
    components: [
      create(Borders),
      create(Score),
      create(Tank, Position.BOTTOM),
      create(Tank, Position.RIGHT),
      create(Tank, Position.LEFT),
      create(Tank, Position.TOP),
      create(Bullet)
    ]
  }
}

const instantiate = (game, getState, getParts) => (Component, ...args) => {
  const p = new Component(...args)
  p.game = game
  p.getState = getState
  p.getParts = getParts
  const f = p.create()
  p.figure = f
  return p
}