import path from 'path'
import { BuildError, BuildWarning } from '../../errors'
import { Artifacts } from '../Artifacts'
import { BuildQueue, ConfigQueueItem } from '../firstPass'
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
    addLogos(item.path, artifacts.config, queue)
    addDocuments(
      item.path,
      artifacts.config.directory,
      artifacts.config.contents,
      queue
    )
  }

  return { errors, warnings }
}

function addLogos(configPath: string, config: Config, queue: BuildQueue) {
  if (config.logo) {
    config.logo = path.resolve(config.directory, config.logo)
    queue.add({
      path: config.logo,
      type: 'ASSET',
      referencedBy: configPath,
    })
  }
  if (config.logoDark) {
    config.logoDark = path.resolve(config.directory, config.logoDark)
    queue.add({
      path: config.logoDark,
      type: 'ASSET',
      referencedBy: configPath,
    })
  }
}

function addDocuments(
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
