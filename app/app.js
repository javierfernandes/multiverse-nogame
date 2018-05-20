import { values, applyTo } from 'ramda'
import { Image } from './src/constants'
import * as preloads from './src/preload/preload'
import * as creators from './src/create/create'

const onStart = () => {
  // global state
  var cursors

  var score = 0
  var scoreText

  const preload = () => { values(preloads).forEach(applyTo(game)) }

  let parts = {}

  function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, Image.sky)

    parts = values(creators).reduce((acc, creator) => Object.assign(acc, creator(game)), parts)

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

    cursors = game.input.keyboard.createCursorKeys()
  }

  function update () {
    const { player, platforms, jumpSound, stars } = parts
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(stars, platforms)

    game.physics.arcade.overlap(player, stars, collectStar, null, this)

    player.body.velocity.x = 0

    if (cursors.left.isDown) {
      player.body.velocity.x = -150
      player.animations.play('left')
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 150
      player.animations.play('right')
    } else {
      player.animations.stop()
      player.frame = 4
    }

    if (cursors.up.isDown && player.body.touching.down) {
      jumpSound.play()
      player.body.velocity.y = -350
    }
  }

  const collectStar = (player, star) => {
    const { collectStarSound } = parts
    collectStarSound.play()
    star.kill()
    score += 10
    scoreText.text = `Score: ${score}`
  }

  const game = new Phaser.Game(800, 600, Phaser.AUTO, 'main', {
    preload,
    create,
    update
  })
}

document.addEventListener('DOMContentLoaded', onStart)
