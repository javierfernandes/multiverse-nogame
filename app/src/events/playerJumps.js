
export const playerJumps = (getParts, getState) => () => {
  const { sounds: { jump } } = getParts()
  jump.play()
}