import { expect } from 'earljs'
import { parseConfig } from '../../src/config/parse'

describe('parseConfig', () => {
  it('can identify unrecognized keys', () => {
    const config = {
      unknownKey: true,
      otherUnknown: 123,
    }
    const message =
      'Configuration error. The following issues were found:\n' +
      "  at config: Unrecognized key(s) in object: 'unknownKey', 'otherUnknown'"
    expect(() => parseConfig(config)).toThrow(message)
  })

  it('can identify type mismatch', () => {
    const config = {
      name: [1],
      contents: [],
    }
    const message =
      'Configuration error. The following issues were found:\n' +
      '  at config.name: Expected string, received array'
    expect(() => parseConfig(config)).toThrow(message)
  })

  it('can check contents', () => {
    const config = {
      name: 'Foo',
      contents: [
        'foo',
        {
          section: 'AAA',
          items: [1],
        },
        false,
        {
          bla: 1,
        },
      ],
    }
    const message =
      'Configuration error. The following issues were found:\n' +
      '  at config.contents[1].items[0]: Invalid input\n' +
      '  at config.contents[2]: Invalid input\n' +
      "  at config.contents[3]: Unrecognized key(s) in object: 'bla'"
    expect(() => parseConfig(config)).toThrow(message)
  })

  it('can parse a valid configuration', () => {
    const input = {
      name: 'Foo',
      contents: ['a', { section: 'b', items: ['c', 'd'] }],
    }
    expect(parseConfig(input)).toEqual(input)
  })
})
