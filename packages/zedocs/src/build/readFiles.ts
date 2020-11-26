import fsx from 'fs-extra'
import { printError } from '../errors'

export function readFiles(assets: string[]) {
  const errors: { asset: string; error: Error }[] = []
  const files: { asset: string; data: string }[] = []
  for (const asset of assets) {
    try {
      const data = fsx.readFileSync(asset, 'utf-8')
      files.push({ asset, data })
    } catch (error) {
      errors.push({ asset, error })
    }
  }
  if (errors.length > 0) {
    for (const { asset, error } of errors) {
      printError(asset, error)
    }
    process.exit(errors.length)
  }
  return files
}
