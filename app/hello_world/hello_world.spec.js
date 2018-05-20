import { expect } from 'chai'
import { greet, bye } from './hello_world'

describe('hello world', () => {
  it('greets', () => {
    expect(greet()).to.equal('Hello World!')
  })

  it('says goodbye', () => {
    expect(bye()).to.equal('See ya!')
  })
})
