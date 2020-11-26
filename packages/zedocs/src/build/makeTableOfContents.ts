import { ContentItem } from './ContentItem'
import { TocItem } from './TableOfContents'
import { File } from './makeFileList'

export function makeTableOfContents(
  tree: ContentItem[],
  files: Map<string, File>
): TocItem[] {
  const items: TocItem[] = []
  for (const entry of tree) {
    if (entry.type === 'DOCUMENT') {
      const link = files.get(entry.asset)?.link
      if (!link) {
        throw new Error('Programmer error.')
      }
      items.push({ type: 'DOCUMENT', link })
    } else {
      const result = makeTableOfContents(entry.items, files)
      items.push({ type: 'SECTION', name: entry.name, items: result })
    }
  }
  return items
}
