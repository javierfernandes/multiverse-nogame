
export const playerJumps = (getParts, getState) => () => {
  const { jumpSound } = getParts()
  jumpSound.play()
}