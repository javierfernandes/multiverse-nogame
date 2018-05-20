import { range } from 'ramda'

const onStart = () => {
  // global state
  var player
  var platforms
  var cursors

  var stars
  var score = 0
  var scoreText

  let backgroundSound
  let jumpSound
  let collectStarSound

  const preload = () => {
    game.load.image('sky', 'assets/sky.png')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('star', 'assets/star.png')
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)

    // audio
    game.load.audio('background', ['assets/audio/background.wav'])
    game.load.audio('jump', ['assets/audio/jump.wav'])
    game.load.audio('collectStar', ['assets/audio/collect-star.wav'])
  }

  function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, 'sky')

    platforms = game.add.group()
    platforms.enableBody = true

    const ground = platforms.create(0, game.world.height - 64, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true

    const ledge1 = platforms.create(400, 400, 'ground')
    ledge1.body.immovable = true
    const ledge2 = platforms.create(-150, 250, 'ground')
    ledge2.body.immovable = true

    player = game.add.sprite(32, game.world.height - 150, 'dude')
    game.physics.arcade.enable(player)
    player.body.bounce.y = 0.2
    player.body.gravity.y = 300
    player.body.collideWorldBounds = true

    player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)

    stars = game.add.group()
    stars.enableBody = true

    //  Here we'll create 12 of them evenly spaced apart
    range(0, 12).forEach(i => {
      const star = stars.create(i * 70, 0, 'star')
      star.body.gravity.y = 300
      star.body.bounce.y = 0.7 + Math.random() * 0.2
    })

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

    cursors = game.input.keyboard.createCursorKeys()

    backgroundSound = game.add.audio('background', 0.5, true)
    backgroundSound.play()

    jumpSound = game.add.audio('jump')
    collectStarSound = game.add.audio('collectStar')
  }

  function update () {
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
