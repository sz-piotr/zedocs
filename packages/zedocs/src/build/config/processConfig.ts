import path from 'path'
import { Artifacts } from '../Artifacts'
import { BuildQueue, ConfigQueueItem } from '../BuildQueue'
import { Config } from './Config'
import { loadConfig } from './loadConfig'

export function processConfig(
  item: ConfigQueueItem,
  queue: BuildQueue,
  artifacts: Artifacts
) {
  const config = loadConfig(item.path)
  artifacts.config = config
  addDocuments(item.path, config.directory, config.contents, queue)
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
