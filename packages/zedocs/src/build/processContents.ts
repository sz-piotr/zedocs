import path from 'path'
import { Config } from '../config'
import { ContentItem } from './ContentItem'

export interface ProcessedContents {
  items: ContentItem[]
  assets: string[]
}

export function processContents(
  directory: string,
  contents: Config['contents'],
  forcePosix = false
): ProcessedContents {
  const items: ContentItem[] = []
  const assets: string[] = []
  for (const entry of contents) {
    if (typeof entry === 'string') {
      const asset = forcePosix
        ? path.posix.resolve(directory, entry)
        : path.resolve(directory, entry)
      assets.push(asset)
      items.push({ type: 'DOCUMENT', asset })
    } else {
      const result = processContents(directory, entry.items, forcePosix)
      assets.push(...result.assets)
      items.push({ type: 'SECTION', name: entry.section, items: result.items })
    }
  }
  return { items, assets: unique(assets) }
}

const unique = <T>(array: T[]): T[] =>
  array.filter((item, i) => array.indexOf(item) === i)
