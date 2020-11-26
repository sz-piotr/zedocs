import { expect } from 'earljs'
import { processContents } from '../../src/build/processContents'
import { Config } from '../../src/config'

const FORCE_POSIX = true

describe('processContents', () => {
  it('resolves a simple path', () => {
    const contents: Config['contents'] = ['foo']
    expect(processContents('/dir/on/disk', contents, FORCE_POSIX)).toEqual({
      items: [{ type: 'DOCUMENT', asset: '/dir/on/disk/foo' }],
      assets: ['/dir/on/disk/foo'],
    })
  })

  it('deduplicates assets', () => {
    const contents: Config['contents'] = ['foo', 'bar', './foo']
    expect(processContents('/dir/on/disk', contents, FORCE_POSIX)).toEqual({
      items: [
        { type: 'DOCUMENT', asset: '/dir/on/disk/foo' },
        { type: 'DOCUMENT', asset: '/dir/on/disk/bar' },
        { type: 'DOCUMENT', asset: '/dir/on/disk/foo' },
      ],
      assets: ['/dir/on/disk/foo', '/dir/on/disk/bar'],
    })
  })

  it('resolves relative paths', () => {
    const contents: Config['contents'] = [
      './foo/bar',
      '../baz',
      '../../../../../x',
    ]
    expect(processContents('/dir/on/disk', contents, FORCE_POSIX)).toEqual({
      items: [
        { type: 'DOCUMENT', asset: '/dir/on/disk/foo/bar' },
        { type: 'DOCUMENT', asset: '/dir/on/baz' },
        { type: 'DOCUMENT', asset: '/x' },
      ],
      assets: ['/dir/on/disk/foo/bar', '/dir/on/baz', '/x'],
    })
  })

  it('resolves absolute paths', () => {
    const contents: Config['contents'] = ['/foo/bar', '/baz']
    expect(processContents('/dir/on/disk', contents, FORCE_POSIX)).toEqual({
      items: [
        { type: 'DOCUMENT', asset: '/foo/bar' },
        { type: 'DOCUMENT', asset: '/baz' },
      ],
      assets: ['/foo/bar', '/baz'],
    })
  })

  it('resolves a nested tree', () => {
    const contents: Config['contents'] = [
      {
        section: 'A',
        items: [
          {
            section: 'A.A',
            items: ['A.A.A', 'A.A.B'],
          },
          'A.B',
        ],
      },
      'B',
    ]
    expect(processContents('/', contents, FORCE_POSIX)).toEqual({
      items: [
        {
          type: 'SECTION',
          name: 'A',
          items: [
            {
              type: 'SECTION',
              name: 'A.A',
              items: [
                { type: 'DOCUMENT', asset: '/A.A.A' },
                { type: 'DOCUMENT', asset: '/A.A.B' },
              ],
            },
            { type: 'DOCUMENT', asset: '/A.B' },
          ],
        },
        { type: 'DOCUMENT', asset: '/B' },
      ],
      assets: ['/A.A.A', '/A.A.B', '/A.B', '/B'],
    })
  })
})
