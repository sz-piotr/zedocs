import path from 'path'
import { BuildError, BuildWarning } from '../../errors'
import { Artifacts } from '../Artifacts'
import { BuildQueue, ConfigQueueItem } from '../BuildQueue'
import { Config } from './Config'
import { loadConfig } from './loadConfig'

export function processConfig(
  item: ConfigQueueItem,
  queue: BuildQueue,
  artifacts: Artifacts
) {
  const errors: BuildError[] = []
  const warnings: BuildWarning[] = []

  const result = loadConfig(item.path)
  if (!result.success) {
    errors.push({
      path: item.path,
      message: result.error,
    })
  } else {
    artifacts.config = result.data
    addDocuments(
      item.path,
      artifacts.config.directory,
      artifacts.config.contents,
      queue
    )
  }

  return { errors, warnings }
}

export function addDocuments(
  configPath: string,
  directory: string,
  contents: Config['contents'],
  queue: BuildQueue
) {
  for (const entry of contents) {
    if (typeof entry === 'string') {
      queue.add({
        type: 'DOCUMENT',
        path: path.resolve(directory, entry),
        referencedBy: configPath,
      })
    } else {
      addDocuments(configPath, directory, entry.items, queue)
    }
  }
}
