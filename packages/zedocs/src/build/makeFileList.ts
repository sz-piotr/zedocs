import path from 'path'
import { ProcessedMarkdown } from './processMarkdown'

export interface File {
  asset: string
  link: string
  target: string
  references: string[]
}

export function makeFileList(processed: ProcessedMarkdown[]) {
  const files = new Map<string, File>()
  for (const item of processed) {
    const link = path.posix.resolve('/', item.slug)
    files.set(item.asset, {
      asset: item.asset,
      link,
      target: path.join(link, 'index.html'),
      references: [],
    })
  }
  for (const item of processed) {
    for (const link of item.links) {
      if (!files.has(link.asset)) {
        const target = findAvailableTarget(files, link.asset)
        files.set(link.asset, {
          asset: link.asset,
          link: target,
          target,
          references: [],
        })
      }
      files.get(link.asset)?.references.push(item.asset)
    }
  }
  return files
}

function findAvailableTarget(files: Map<string, File>, asset: string) {
  const { name, ext } = path.parse(asset)
  const n = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const suffix = n === 0 ? '' : `-${n}`
    const target = path.posix.join('/static', `${name}${suffix}${ext}`)
    let unique = true
    for (const file of files.values()) {
      if (file.target === target) {
        unique = false
        break
      }
    }
    if (unique) {
      return target
    }
  }
}
