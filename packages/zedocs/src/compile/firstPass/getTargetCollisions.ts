import { BuildError } from '../../errors'
import { Artifacts } from '../Artifacts'

export function getTargetCollisions(artifacts: Artifacts) {
  const errors: BuildError[] = []
  const references = new Map<string, string[]>()

  const items = [...artifacts.documents, ...artifacts.outputs]
  for (const { sourcePath, targetPath } of items) {
    const existing = references.get(targetPath) ?? []
    references.set(targetPath, existing.concat(sourcePath))
  }

  for (const [targetPath, sources] of references) {
    if (sources.length > 1) {
      for (const source of sources) {
        errors.push({
          path: source,
          message: `Output file collision. Multiple files reference "${targetPath}".`,
        })
      }
    }
  }

  return errors
}
