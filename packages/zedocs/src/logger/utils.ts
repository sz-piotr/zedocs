import { join } from 'path'

export function shortenPath(where: string) {
  const cwd = join(process.cwd(), '/')
  if (where.startsWith(cwd)) {
    return where.substring(cwd.length)
  }
  return where
}

export function indentMessage(error: Error | string) {
  const message = typeof error === 'string' ? error : error.message
  return '  ' + message.replace(/\n/g, '\n  ')
}
