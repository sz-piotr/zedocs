import minimist from 'minimist'

export interface CliOptions {
  command?: 'serve' | 'build'
  config?: string
  version?: boolean
  help?: boolean
}

const ALLOWED_OPTIONS = ['h', 'help', 'v', 'version', 'c', 'config']

export function parseCliOptions(args: string[]): CliOptions {
  const parsed = minimist(args)
  const options: CliOptions = {}

  const showHelp = get(parsed, 'h', 'help')
  if (showHelp) {
    return { help: true }
  }

  if (parsed._.length > 1) {
    throw new Error('Too many arguments. See "zedocs --help".')
  }

  checkAllowed(parsed)

  const command = parsed._[0]
  if (command === 'build') {
    options.command = 'build'
  } else if (command === 'serve') {
    options.command = 'serve'
  } else if (command) {
    throw new Error(`Unknown command "${command}". See "zedocs --help".`)
  }

  const version = get(parsed, 'v', 'version')
  if (version !== undefined) {
    if (typeof version !== 'boolean') {
      throw new Error('The version argument does not take a value. See "zedocs --help".')
    }
    options.version = version
  }

  const config = get(parsed, 'c', 'config')
  if (config !== undefined) {
    if (typeof config !== 'string') {
      throw new Error('Invalid config value passed as argument. See "zedocs --help".')
    }
    options.config = config
  }

  return options
}

function get(parsed: minimist.ParsedArgs, short: string, full: string): unknown {
  if (parsed[short] && parsed[full]) {
    throw new Error(`Both -${short} and --${full} specified.`)
  }
  return parsed[short] ?? parsed[full]
}

function checkAllowed(parsed: minimist.ParsedArgs) {
  const options = Object.keys(parsed).filter((x) => x !== '_')
  for (const option of options) {
    if (!ALLOWED_OPTIONS.includes(option)) {
      throw new Error(`Invalid option specified: ${option}. See "zedocs --help".`)
    }
  }
}
