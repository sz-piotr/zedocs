import { BuildError, BuildWarning } from '../../errors'
import { Artifacts } from '../Artifacts'
import { AssetQueueItem } from '../BuildQueue'
import { readFileToBuffer } from '../files'
import { findAvailableTarget } from './findAvailableTarget'

export function processAsset(item: AssetQueueItem, artifacts: Artifacts) {
  const errors: BuildError[] = []
  const warnings: BuildWarning[] = []

  const result = readFileToBuffer(item.path)
  if (!result.success) {
    errors.push({
      path: item.path,
      referencedBy: item.referencedBy,
      message: result.error,
    })
  } else {
    artifacts.outputs.push({
      sourcePath: item.path,
      targetPath: findAvailableTarget(item.path, artifacts),
      content: result.data,
    })
  }

  return { errors, warnings }
}
