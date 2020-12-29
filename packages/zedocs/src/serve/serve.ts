import chokidar from 'chokidar'
import { CliOptions } from '../cli/options'
import { compile } from '../compile'
import { Artifacts } from '../compile/Artifacts'
import {
  logChangesDetected,
  logCompiledSuccessfully,
  logCompiledWithWarnings,
  logCompiledWithErrors,
} from '../logger'
import { Outputs } from './outputs'
import { runServer } from './runServer'

export function serve(options: CliOptions) {
  const artifacts = compile(options.config)
  const outputs = new Outputs()
  const watcher = chokidar
    .watch([], { disableGlobbing: true })
    .on('change', update)
    .on('unlink', update)

  onCompile(outputs, watcher, artifacts)
  runServer(outputs, options)

  function update() {
    onChange(options.config, outputs, watcher, artifacts)
  }
}

function onChange(
  config: string | undefined,
  outputs: Outputs,
  watcher: chokidar.FSWatcher,
  artifacts: Artifacts
) {
  logChangesDetected()
  watcher.unwatch(artifacts.inputs)
  artifacts = compile(config)
  onCompile(outputs, watcher, artifacts)
}

function onCompile(
  outputs: Outputs,
  watcher: chokidar.FSWatcher,
  artifacts: Artifacts
) {
  outputs.update(artifacts.outputs)
  watcher.add(artifacts.inputs)
  if (artifacts.hasErrors) {
    logCompiledWithErrors()
  } else if (artifacts.hasWarnings) {
    logCompiledWithWarnings(artifacts.compileTimeMs)
  } else {
    logCompiledSuccessfully(artifacts.compileTimeMs)
  }
}
