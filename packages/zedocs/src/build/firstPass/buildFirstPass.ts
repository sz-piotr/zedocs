import { resolve } from 'path'
import {
  BuildError,
  BuildWarning,
  printError,
  printWarning,
} from '../../errors'
import { Artifacts } from '../Artifacts'
import { BuildQueue } from './BuildQueue'
import { getTargetCollisions } from './getTargetCollisions'
import { processItem } from './processItem'

const ZEDOCS_JS_PATH = resolve(__dirname, '../../../assets/zedocs.js')
const ZEDOCS_CSS_PATH = resolve(__dirname, '../../../assets/zedocs.css')

export function buildFirstPass(configPath: string | undefined) {
  const artifacts = new Artifacts()
  const queue = new BuildQueue()
  queue.add({ type: 'CONFIG', path: resolve(configPath ?? 'zedocs.json') })
  queue.add({ type: 'ASSET', path: ZEDOCS_JS_PATH })
  queue.add({ type: 'ASSET', path: ZEDOCS_CSS_PATH })

  const warnings: BuildWarning[] = []
  const errors: BuildError[] = []

  for (let item = queue.remove(); item !== undefined; item = queue.remove()) {
    const result = processItem(item, queue, artifacts)
    warnings.push(...result.warnings)
    errors.push(...result.errors)
  }
  errors.push(...getTargetCollisions(artifacts))

  printWarnings(warnings)
  printErrors(errors)
  return artifacts
}

function printWarnings(warnings: BuildWarning[]) {
  for (const { path, message } of warnings) {
    printWarning(path, message)
  }
}

function printErrors(errors: BuildError[]) {
  for (const { path, message } of errors) {
    printError(path, message)
  }
  if (errors.length > 0) {
    process.exit(errors.length)
  }
}
