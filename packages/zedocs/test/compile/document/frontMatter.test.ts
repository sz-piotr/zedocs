import { expect } from 'earljs'
import { parseFrontMatter } from '../../../src/compile/document/frontMatter'

describe('frontMatter', () => {
  it('can correctly parse YAML', () => {
    const text = 'name: Document Title\nslug: /foo/bar'

    expect(parseFrontMatter(text)).toEqual({
      frontMatter: { name: 'Document Title', slug: '/foo/bar' },
    })
  })

  it('can identify type mismatch', () => {
    const text = 'name: true\nslug: 1'
    expect(parseFrontMatter(text)).toEqual({
      frontMatter: {},
      error:
        'Front matter error. The following issues were found:\n' +
        '  at frontMatter.name: Expected string, received boolean\n' +
        '  at frontMatter.slug: Expected string, received number',
    })
  })

  it('can identify invalid YAML', () => {
    const text = '"+'
    expect(parseFrontMatter(text)).toEqual({
      frontMatter: {},
      error: 'Front matter error. Cannot parse YAML.',
    })
  })
})
