import { BuildError, BuildWarning } from '../../errors'
import { Artifacts } from '../Artifacts'
import { AssetQueueItem } from '../firstPass'
import { readFileToBuffer } from '../files'
import { findAvailableTarget } from './findAvailableTarget'
import { getMetadata } from './getMetadata'

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
    const metadata = getMetadata(result.data)
    artifacts.outputs.push({
      sourcePath: item.path,
      targetPath: findAvailableTarget(item.path, artifacts),
      content: result.data,
      metadata,
    })
  }

  return { errors, warnings }
}
