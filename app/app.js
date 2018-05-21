import { values, applyTo } from 'ramda'
import { Image } from './src/constants'
import * as preloads from './src/preload/preload'
import create from './src/create/create'
import update from './src/update/update'

const onStart = () => {
  let parts = {}
  const state = {
    score: 0,
    collectedStars: 0
  }
  const getParts = () => parts
  const getState = () => state

  const game = new Phaser.Game(800, 600, Phaser.AUTO, 'main', {
    preload: () => { values(preloads).forEach(applyTo(game)) },
    create: () => {
      game.physics.startSystem(Phaser.Physics.ARCADE)
      game.add.sprite(0, 0, Image.sky)

      parts = create(game, getParts, getState)
      // TODO: migrate to creators
      parts.scoreText = game.add.text(16, 16, `Score: ${state.score}`, { fontSize: '32px', fill: '#000' })
    },
    update: () => { update(parts, game) }
  })
}

document.addEventListener('DOMContentLoaded', onStart)
