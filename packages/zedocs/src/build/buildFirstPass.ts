import { resolve } from 'path'
import { BuildError, BuildWarning, printError, printWarning } from '../errors'
import { Artifacts } from './Artifacts'
import { processAsset } from './asset'
import { BuildQueue, BuildQueueItem } from './BuildQueue'
import { processConfig } from './config'
import { processDocument } from './document'

export function buildFirstPass(configPath: string | undefined) {
  const artifacts = new Artifacts()
  const queue = new BuildQueue()
  queue.add({ type: 'CONFIG', path: resolve(configPath ?? 'zedocs.json') })

  const warnings: BuildWarning[] = []
  const errors: BuildError[] = []

  for (let item = queue.remove(); item !== undefined; item = queue.remove()) {
    const result = processItem(item, queue, artifacts)
    warnings.push(...result.warnings)
    errors.push(...result.errors)
  }

  printWarnings(warnings)
  printErrors(errors)
  return artifacts
}
function processItem(
  item: BuildQueueItem,
  queue: BuildQueue,
  artifacts: Artifacts
) {
  if (item.type === 'CONFIG') {
    return processConfig(item, queue, artifacts)
  } else if (item.type === 'DOCUMENT') {
    return processDocument(item, queue, artifacts)
  } else {
    // item.type === 'ASSET'
    return processAsset(item, artifacts)
  }
}
function printWarnings(warnings: BuildWarning[]) {
  for (const { path, message } of warnings) {
    printWarning(path, message)
  }
}
function printErrors(errors: BuildError[]) {
  for (const { path, message } of errors) {
    printError(path, message)
  }
  if (errors.length > 0) {
    process.exit(errors.length)
  }
}
