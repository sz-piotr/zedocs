import { CliOptions } from '../cli/options'
import { compile } from '../compile'
import { printWarning } from '../errors'
import { output } from './output'

export function build(options: CliOptions) {
  if (options.port !== undefined) {
    printWarning('zedocs', 'Specifying the port does nothing when building.')
  }
  try {
    const artifacts = compile(options.config)
    output(artifacts)
  } catch (e: unknown) {
    if (e instanceof Error && e.message === 'Build failed') {
      process.exit(1)
    } else {
      throw e
    }
  }
}
