import { range, values, applyTo } from 'ramda'
import { Image, Audio } from './src/constants'
import * as preloads from './src/preload/preload'
import * as creators from './src/create/create'

const onStart = () => {
  // global state
  var platforms
  var cursors

  var stars
  var score = 0
  var scoreText

  let backgroundSound
  let jumpSound
  let collectStarSound

  const preload = () => {
    values(preloads).forEach(applyTo(game))
  }

  let parts = {}

  function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, Image.sky)

    platforms = game.add.group()
    platforms.enableBody = true

    const ground = platforms.create(0, game.world.height - 64, Image.ground)
    ground.scale.setTo(2, 2)
    ground.body.immovable = true

    const ledge1 = platforms.create(400, 400, Image.ground)
    ledge1.body.immovable = true
    const ledge2 = platforms.create(-150, 250, Image.ground)
    ledge2.body.immovable = true

    console.log('WILL RUN CREATORS')
    parts = values(creators).reduce((acc, creator) => Object.assign(acc, creator(game)), parts)

    console.log('CREATORS DONE', parts)

    stars = game.add.group()
    stars.enableBody = true

    //  Here we'll create 12 of them evenly spaced apart
    range(0, 12).forEach(i => {
      const star = stars.create(i * 70, 0, Image.star)
      star.body.gravity.y = 300
      star.body.bounce.y = 0.7 + Math.random() * 0.2
    })

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

    cursors = game.input.keyboard.createCursorKeys()

    backgroundSound = game.add.audio(Audio.background, 0.5, true)
    backgroundSound.play()

    jumpSound = game.add.audio(Audio.jump)
    collectStarSound = game.add.audio(Audio.collectStar)
  }

  function update () {
    const { player } = parts
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
    collectStarSound.play()
    star.kill()
    score += 10
    scoreText.text = 'Score: ' + score
  }

  const game = new Phaser.Game(800, 600, Phaser.AUTO, 'main', {
    preload,
    create,
    update
  })
}

document.addEventListener('DOMContentLoaded', onStart)
