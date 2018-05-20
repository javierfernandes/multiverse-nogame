import { values, applyTo, apply, flip } from 'ramda'
import { Image } from './src/constants'
import * as preloads from './src/preload/preload'
import * as creators from './src/create/create'
import * as updates from './src/update/update'

const flippedApply = flip(apply)

const onStart = () => {
  let parts = {}
  const state = {
    score: 0,
    collectedStars: 0
  }
  const getParts = () => parts
  const getState = () => state

  const preload = () => { values(preloads).forEach(applyTo(game)) }
  const update = () => { values(updates).forEach(flippedApply([parts, game])) }

  const create = () => {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, Image.sky)

    parts = values(creators).reduce((acc, creator) =>
      Object.assign(acc, creator(game, getParts, getState)),
    parts)

    // TODO: migrate to creators
    parts.scoreText = game.add.text(16, 16, `Score: ${state.score}`, { fontSize: '32px', fill: '#000' })
    parts.cursors = game.input.keyboard.createCursorKeys()
  }

  const game = new Phaser.Game(800, 600, Phaser.AUTO, 'main', {
    preload,
    create,
    update
  })
}

document.addEventListener('DOMContentLoaded', onStart)
