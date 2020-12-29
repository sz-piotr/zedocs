import { build } from '../build'
import { exitWithError } from '../errors'
import { serve } from '../serve'
import { parseCliOptions } from './options'
import { usage, version } from './usage'

export function run(args: string[]) {
  const options = readOptions(args)
  if (options.help) {
    console.log(usage)
  } else if (options.version) {
    console.log(version)
  } else if (options.command === 'build') {
    return build(options)
  } else if (options.command === 'serve') {
    return serve(options)
  } else {
    exitWithError('zedocs', 'No command specified. See "zedocs --help".')
  }
}

function readOptions(args: string[]) {
  try {
    return parseCliOptions(args)
  } catch (e) {
    exitWithError('zedocs', e)
  }
}
