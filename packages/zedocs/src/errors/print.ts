import chalk from 'chalk'
import { join } from 'path'

export function exitWithError(where: string, error: Error | string): never {
  printError(where, error)
  process.exit(1)
}

export function printError(where: string, error: Error | string) {
  const location = shortenWhere(where)
  const message = getIndentedMessage(error)
  console.error(chalk.red(`ERROR ${location}:\n${message}\n`))
}

export function printWarning(where: string, warning: Error | string) {
  const location = shortenWhere(where)
  const message = getIndentedMessage(warning)
  console.warn(chalk.yellow(`WARNING ${location}:\n${message}\n`))
}

function shortenWhere(where: string) {
  const cwd = join(process.cwd(), '/')
  if (where.startsWith(cwd)) {
    return where.substring(cwd.length)
  }
  return where
}

function getIndentedMessage(error: Error | string) {
  const message = typeof error === 'string' ? error : error.message
  return '  ' + message.replace(/\n/g, '\n  ')
}
