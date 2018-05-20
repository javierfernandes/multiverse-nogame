import { expect } from 'chai'
import greet from './hello_universe'

describe('hello universe', () => {
  it('greets better than hello world', () => {
    expect(greet()).to.equal('Hello Universe!')
  })
})
