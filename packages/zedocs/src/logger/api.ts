import chalk from 'chalk'
import { indentMessage, shortenPath } from './utils'

export function logError(path: string, error: Error | string) {
  const location = shortenPath(path)
  const message = indentMessage(error)
  log(chalk.red(`ERROR ${location}:\n${message}`), {
    addNewline: true,
  })
}

export function logErrors(warnings: { path: string; message: string }[]) {
  for (const { path, message } of warnings) {
    logError(path, message)
  }
}

export function logWarning(path: string, warning: Error | string) {
  const location = shortenPath(path)
  const message = indentMessage(warning)
  log(chalk.yellow(`WARNING ${location}:\n${message}`), {
    addNewline: true,
  })
}

export function logWarnings(warnings: { path: string; message: string }[]) {
  for (const { path, message } of warnings) {
    logWarning(path, message)
  }
}

export function logChangesDetected() {
  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const time = `${hours}:${minutes}`
  log(chalk.green(`[${time}] Changes detected, recompiling`))
}

export function logCompiledSuccessfully(ms: number) {
  const time = chalk.green(`(${ms}ms)`)
  log(`Compiled successfully ${time}`, { skipNewLine: true })
}

export function logCompiledWithWarnings(ms: number) {
  const time = chalk.green(`(${ms}ms)`)
  log(`Compiled with warnings ${time}`, { skipNewLine: true })
}

export function logCompiledWithErrors() {
  log(chalk.red('Compilation failed due to errors'))
}

export function logListening(port: number) {
  const url = chalk.blue(`http://localhost:${port}`)
  const message = `Server listening on: ${url}`
  log(message, { skipNewLine: true })
}

interface LogOptions {
  skipNewLine?: boolean
  addNewline?: boolean
}

let newlinePresent = true
function log(message: string, options: LogOptions = {}) {
  if (!options.skipNewLine && !newlinePresent) {
    console.log()
  }
  console.log(message)
  newlinePresent = !!options.addNewline
  if (newlinePresent) {
    console.log()
  }
}
