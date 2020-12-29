import { CliOptions } from '../cli/options'
import { compile } from '../compile'
import { logCompiledSuccessfully, logWarning } from '../logger'
import { output } from './output'

export function build(options: CliOptions) {
  if (options.port !== undefined) {
    logWarning('zedocs', 'Specifying the port does nothing when building.')
  }
  const start = Date.now()
  const artifacts = compile(options.config)
  if (artifacts.hasErrors) {
    process.exit(1)
  }
  output(artifacts)
  logCompiledSuccessfully(Date.now() - start)
}
