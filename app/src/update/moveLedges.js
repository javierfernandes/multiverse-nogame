
export const moveLedges = ({ ledge1, ledge2 }, { world }) => {
  move(ledge1, world)
  move(ledge2, world)
}

const move = ({ body }, world) => {
  if (body.x + body.width >= world.width) {
    body.x = world.width - body.width - 1
    body.velocity.x = -200
  } else if (body.x <= 0) {
    body.x = 1
    body.velocity.x = 200
  }
}