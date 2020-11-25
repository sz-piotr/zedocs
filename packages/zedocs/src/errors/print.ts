import chalk from 'chalk'

export function exitWithError(where: string, error: Error | string): never {
  printError(where, error)
  process.exit(1)
}

export function printError(where: string, error: Error | string) {
  console.error(chalk.red(`ERROR ${where}:\n${getIndentedMessage(error)}\n`))
}

export function printWarning(where: string, warning: Error | string) {
  console.warn(
    chalk.yellow(`WARNING ${where}:\n${getIndentedMessage(warning)}\n`)
  )
}

function getIndentedMessage(error: Error | string) {
  const message = typeof error === 'string' ? error : error.message
  return '  ' + message.replace(/\n/g, '\n  ')
}
