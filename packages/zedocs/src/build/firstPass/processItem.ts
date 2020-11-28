import { Artifacts } from '../Artifacts'
import { processAsset } from '../asset'
import { BuildQueue, BuildQueueItem } from './BuildQueue'
import { processConfig } from '../config'
import { processDocument } from '../document'

export function processItem(
  item: BuildQueueItem,
  queue: BuildQueue,
  artifacts: Artifacts
) {
  if (item.type === 'CONFIG') {
    return processConfig(item, queue, artifacts)
  } else if (item.type === 'DOCUMENT') {
    return processDocument(item, queue, artifacts)
  } else {
    return processAsset(item, artifacts)
  }
}
