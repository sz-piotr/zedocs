import { CliOptions } from '../cli/options'
import { compile } from '../compile'
import { Outputs } from './outputs'
import { runServer } from './runServer'

export function serve(options: CliOptions) {
  const artifacts = compile(options.config)
  const outputs = new Outputs()
  outputs.update(artifacts)
  runServer(outputs, options)
}
