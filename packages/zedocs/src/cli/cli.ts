import { build } from '../build/build'
import { exitWithError } from '../errors'
import { CliOptions, parseCliOptions } from './options'
import { usage, version } from './usage'

export function run(args: string[]) {
  let options: CliOptions
  try {
    options = parseCliOptions(args)
  } catch (e) {
    exitWithError(e)
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
