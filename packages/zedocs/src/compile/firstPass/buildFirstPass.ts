import { resolve } from 'path'
import { BuildError, BuildWarning } from '../../errors'
import { logErrors, logWarnings } from '../../logger'
import { Artifacts } from '../Artifacts'
import { BuildQueue } from './BuildQueue'
import { getTargetCollisions } from './getTargetCollisions'
import { processItem } from './processItem'

const ZEDOCS_JS_PATH = resolve(__dirname, '../../scripts/zedocs.js')
const ZEDOCS_CSS_PATH = resolve(__dirname, '../../styles/zedocs.css')
const POWERED_BY_PATH = resolve(__dirname, '../../../powered-by.svg')

export function buildFirstPass(configPath: string | undefined) {
  const startTimeMs = Date.now()
  const artifacts = new Artifacts()
  const queue = new BuildQueue()
  queue.add({ type: 'CONFIG', path: resolve(configPath ?? 'zedocs.json') })
  queue.add({ type: 'ASSET', path: ZEDOCS_JS_PATH })
  queue.add({ type: 'ASSET', path: ZEDOCS_CSS_PATH })
  queue.add({ type: 'ASSET', path: POWERED_BY_PATH })

  const warnings: BuildWarning[] = []
  const errors: BuildError[] = []

  for (let item = queue.remove(); item !== undefined; item = queue.remove()) {
    artifacts.inputs.push(item.path)
    const result = processItem(item, queue, artifacts)
    warnings.push(...result.warnings)
    errors.push(...result.errors)
  }
  errors.push(...getTargetCollisions(artifacts))

  logWarnings(warnings)
  logErrors(errors)

  artifacts.hasWarnings = warnings.length !== 0
  artifacts.hasErrors = errors.length !== 0
  artifacts.compileTimeMs = Date.now() - startTimeMs
  return artifacts
}
