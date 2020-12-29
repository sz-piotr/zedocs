import { logError } from '../logger'

export function errorToString(e: Error) {
  return e.message
}

export function exitWithError(path: string, error: Error | string): never {
  logError(path, error)
  process.exit(1)
}
