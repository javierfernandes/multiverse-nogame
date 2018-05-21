import { values } from 'ramda'

import * as creators from './all'

export default (game, getParts, getState) => values(creators)
  .reduce((acc, creator) =>
    Object.assign(acc, creator(game, getParts, getState)),
  {})
