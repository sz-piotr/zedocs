import chokidar from 'chokidar'
import { CliOptions } from '../cli/options'
import { compile } from '../compile'
import { Outputs } from './outputs'
import { runServer } from './runServer'

export function serve(options: CliOptions) {
  let artifacts = compile(options.config)
  const outputs = new Outputs()
  outputs.update(artifacts.outputs)

  const watcher = chokidar
    .watch(artifacts.inputs, { disableGlobbing: true })
    .on('change', onChange)
    .on('unlink', onChange)

  function onChange() {
    console.log('Changes detected. Recompiling')
    watcher.unwatch(artifacts.inputs)
    artifacts = compile(options.config)
    outputs.update(artifacts.outputs)
    watcher.add(artifacts.inputs)
    console.log('Compiled successfully')
  }

  runServer(outputs, options)
}
