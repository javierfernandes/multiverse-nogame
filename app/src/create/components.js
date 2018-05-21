import Player from '../components/Player'

export const components = game => {
  const p = new Player()
  p.game = game
  p.events = {}
  const f = p.create()
  p.figure = f
  return {
    components: [p]
  }
}