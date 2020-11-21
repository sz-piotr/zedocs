import { usage, version } from './usage'
import { loadConfig } from './config'
import { build } from './build'
import { serve } from './serve'

run(process.argv.slice(2))

function run(args: string[]) {
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    console.log(usage)
  } else {
    const [command, ...rest] = args
    if (command === '-v' || command === '--version') {
      console.log(version)
    } else if (command === 'build') {
      if (rest.length > 1) {
        runError(`Too many options`)
      }
      build(loadConfig(rest[0]))
    } else if (command === 'serve') {
      if (rest.length > 1) {
        runError(`Too many options`)
      }
      serve()
    } else if (command.startsWith('-')) {
      runError(`Unknown option ${command}`)
    } else {
      runError(`Unknown command ${command}`)
    }
  }
}

function runError(message: string) {
  console.error(`Error: ${message}`)
  process.exit(1)
}
