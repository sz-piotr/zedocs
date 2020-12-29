import { Artifacts } from '../Artifacts'

export function getLinkMapping({ documents, outputs }: Artifacts) {
  const mapping = new Map<string, string>()
  for (const document of documents) {
    mapping.set(document.sourcePath, document.slug)
  }
  for (const output of outputs) {
    mapping.set(output.sourcePath, output.targetPath)
  }
  return mapping
}
