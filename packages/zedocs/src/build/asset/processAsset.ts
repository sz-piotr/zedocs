import fsx from 'fs-extra'
import { Artifacts } from '../Artifacts'
import { AssetQueueItem } from '../BuildQueue'
import { exitWithError } from '../../errors'
import { findAvailableTarget } from './findAvailableTarget'

export function processAsset(item: AssetQueueItem, artifacts: Artifacts) {
  const content = readFile(item.path)
  artifacts.outputs.push({
    sourcePath: item.path,
    targetPath: findAvailableTarget(item.path, artifacts),
    content,
  })
}

function readFile(filename: string) {
  try {
    return fsx.readFileSync(filename)
  } catch (e) {
    exitWithError(filename, e)
  }
}
