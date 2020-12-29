import path from 'path'
import { Artifacts } from '../Artifacts'
import { Config } from '../config'

export type TocItem = TocDocument | TocSection

export interface TocDocument {
  type: 'DOCUMENT'
  name: string
  link: string
}

export interface TocSection {
  type: 'SECTION'
  name: string
  items: TocItem[]
}

export function getTableOfContents(artifacts: Artifacts) {
  return getTocItems(artifacts.config.contents, artifacts)
}

function getTocItems(contents: Config['contents'], artifacts: Artifacts) {
  const directory = artifacts.config.directory
  const items: TocItem[] = []
  for (const entry of contents) {
    if (typeof entry === 'string') {
      const sourcePath = path.resolve(directory, entry)
      const document = artifacts.documents.find(
        (x) => x.sourcePath === sourcePath
      )
      if (!document) {
        throw new Error('Programmer error. Document not found!')
      }
      items.push({ type: 'DOCUMENT', name: document.name, link: document.slug })
    } else {
      items.push({
        type: 'SECTION',
        name: entry.section,
        items: getTocItems(entry.items, artifacts),
      })
    }
  }
  return items
}
