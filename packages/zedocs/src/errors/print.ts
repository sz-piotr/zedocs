import chalk from 'chalk'

export function exitWithError(error: Error | string): never {
  printError(error)
  process.exit(1)
}

export function printError(error: Error | string) {
  const message = typeof error === 'string' ? error : error.message
  console.error(chalk.red(`error: ${message}`))
}
