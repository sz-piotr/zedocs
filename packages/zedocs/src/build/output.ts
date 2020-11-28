import path from 'path'
import fsx from 'fs-extra'
import { Artifacts } from './Artifacts'

export function output({ config, documents, outputs }: Artifacts) {
  const dist = path.join(config.directory, 'dist')
  fsx.ensureDirSync(dist)
  fsx.emptyDirSync(dist)
  for (const document of documents) {
    const dest = path.join(dist, document.slug, 'index.html')
    fsx.ensureDirSync(path.dirname(dest))
    fsx.writeFileSync(dest, document.content)
  }
  for (const output of outputs) {
    const dest = path.join(dist, output.targetPath)
    fsx.ensureDirSync(path.dirname(dest))
    fsx.writeFileSync(dest, output.content)
  }
}
