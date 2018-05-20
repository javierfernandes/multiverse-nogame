
export const updateKeyboard = ({ player, cursors, jumpSound }) => {
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
    player.body.velocity.y = -225
  }
}