import { mapObjIndexed, flip, apply } from 'ramda'
import * as eventCreators from '../events/events'

// collects and creates event handlers from all files in `src/events/*.js`
// they can be later accessed from updates as the "events" part.

export const events = (game, getParts, getState) => ({
  events: mapObjIndexed(flip(apply)([getParts, getState]), eventCreators)
})