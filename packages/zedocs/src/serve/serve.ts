import chalk from 'chalk'
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
    console.log(chalk.green('Changes detected. Recompiling.'))
    watcher.unwatch(artifacts.inputs)
    try {
      const start = Date.now()
      artifacts = compile(options.config)
      outputs.update(artifacts.outputs)
      watcher.add(artifacts.inputs)
      const duration = Date.now() - start
      console.log(`Compiled successfully. ${chalk.green(`(${duration} ms)`)}\n`)
    } catch (e: unknown) {
      watcher.add(artifacts.inputs)
      if (e instanceof Error && e.message === 'Build failed') {
        console.log(chalk.red('Build completed with errors.\n'))
      } else {
        throw e
      }
    }
  }

  runServer(outputs, options)
}
