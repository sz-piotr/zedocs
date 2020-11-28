import fsx from 'fs-extra'
import path from 'path'
import { Artifacts } from './Artifacts'
import { writeFile } from './files'

export function output({ config, documents, outputs }: Artifacts) {
  const dist = path.join(config.directory, 'dist')
  fsx.ensureDirSync(dist)
  fsx.emptyDirSync(dist)
  for (const document of documents) {
    const dest = path.join(dist, document.slug, 'index.html')
    writeFile(dest, document.content)
  }
  for (const output of outputs) {
    const dest = path.join(dist, output.targetPath)
    writeFile(dest, output.content)
  }
}
