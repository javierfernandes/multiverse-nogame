import { values, applyTo } from 'ramda'
import { Image } from './src/constants'
import * as preloads from './src/preload/preload'
import create from './src/create/create'
import update from './src/update/update'

import { Position } from './src/components/Tank'

const onStart = () => {
  let parts = {}
  const state = {
    // order matters: determins the fire roundrobin
    tanks: [Position.BOTTOM, Position.LEFT, Position.TOP, Position.RIGHT],
    firingTank: Position.BOTTOM,
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
    },
    update: () => { update(parts, game) }
  })
}

document.addEventListener('DOMContentLoaded', onStart)
