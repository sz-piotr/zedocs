import { CliOptions } from '../cli/options'
import { compile } from '../compile'
import { getOutputs } from './outputs'
import { runServer } from './runServer'

export function serve(options: CliOptions) {
  const artifacts = compile(options.config)
  const outputs = getOutputs(artifacts)
  runServer(outputs, options)
}
