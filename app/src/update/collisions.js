
export const collisions = ({ player, platforms, stars, events }, game) => {
  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(stars, platforms)

  game.physics.arcade.overlap(player, stars, events.starCollected, null, this)
}
