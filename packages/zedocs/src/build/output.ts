import fsx from 'fs-extra'
import path from 'path'
import { Artifacts } from './Artifacts'
import { writeFile } from './files'

export function output({ config, documents, outputs }: Artifacts) {
  const dist = path.join(config.directory, 'dist')
  fsx.ensureDirSync(dist)
  fsx.emptyDirSync(dist)
  for (const { targetPath, content } of [...documents, ...outputs]) {
    const dest = path.join(dist, targetPath)
    writeFile(dest, content)
  }
}
