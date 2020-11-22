import chalk from 'chalk'
import { CliOptions, parseCliOptions } from './options'
import { usage, version } from './usage'
import { build } from '../build/build'

export function run(args: string[]) {
  let options: CliOptions
  try {
    options = parseCliOptions(args)
  } catch (e) {
    exitWithError(e.message)
  }
  if (options.help) {
    console.log(usage)
  } else if (options.version) {
    console.log(version)
  } else if (options.command === 'build') {
    return build(options.config)
  } else if (options.command === 'serve') {
    exitWithError('The serve command is not yet supported.')
  } else {
    exitWithError('No command specified. See "zedocs --help".')
  }
}

function exitWithError(message: string): never {
  console.error(chalk.red(`zedocs: ${message}`))
  process.exit(1)
}
