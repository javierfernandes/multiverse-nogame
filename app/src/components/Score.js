
export default class Score {
  create(game, getParts, getState) {
    return this.game.add.text(16, 16, `Score: ${this.getState().score}`, { fontSize: '32px', fill: '#000' })
  }
  update() {
    // TODO: only set if the score changed
    this.figure.text = `Score: ${this.getState().score}`
  }
}