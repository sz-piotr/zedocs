import { BuildError, BuildWarning } from '../../errors'
import { Artifacts } from '../Artifacts'
import { BuildQueue, DocumentQueueItem } from '../BuildQueue'
import { readFileToString } from '../files'
import { processMarkdown } from './processMarkdown'

export function processDocument(
  item: DocumentQueueItem,
  queue: BuildQueue,
  artifacts: Artifacts
) {
  const errors: BuildError[] = []
  const warnings: BuildWarning[] = []

  const result = readFileToString(item.path)
  if (!result.success) {
    errors.push({
      path: item.path,
      referencedBy: item.referencedBy,
      message: result.error,
    })
  } else {
    const processed = processMarkdown(item.path, result.data)
    if (processed.warning) {
      warnings.push({
        path: item.path,
        referencedBy: item.referencedBy,
        message: processed.warning,
      })
    }
    artifacts.documents.push({
      sourcePath: item.path,
      name: processed.name,
      slug: processed.slug,
      content: processed.content,
    })
    for (const link of processed.links) {
      queue.add({
        type: link.endsWith('.md') ? 'DOCUMENT' : 'ASSET',
        path: link,
        referencedBy: item.path,
      })
    }
  }

  return { errors, warnings }
}
