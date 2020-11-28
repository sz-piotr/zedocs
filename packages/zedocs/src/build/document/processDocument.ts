import fsx from 'fs-extra'
import { exitWithError } from '../../errors'
import { Artifacts } from '../Artifacts'
import { BuildQueue, DocumentQueueItem } from '../BuildQueue'
import { processMarkdown } from './processMarkdown'

export function processDocument(
  item: DocumentQueueItem,
  queue: BuildQueue,
  artifacts: Artifacts
) {
  const data = readFile(item.path)
  const processed = processMarkdown(item.path, data)
  artifacts.documents.push({
    sourcePath: item.path,
    name: processed.name,
    slug: processed.slug,
    content: processed.content,
  })
  for (const link of processed.links) {
    queue.add({
      type: 'ASSET',
      path: link,
      referencedBy: item.path,
    })
  }
}

function readFile(filename: string) {
  try {
    return fsx.readFileSync(filename, 'utf-8')
  } catch (e) {
    exitWithError(filename, e)
  }
}
