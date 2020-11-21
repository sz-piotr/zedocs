import { expect } from 'earljs'
import { add } from '../src'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toEqual(3)
  })
})
