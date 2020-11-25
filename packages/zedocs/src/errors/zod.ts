import { ZodError } from 'zod'

export function zodErrorToString(name: string, base: string, e: ZodError) {
  let message = `${name}. The following issues were found:`
  for (const issue of e.issues) {
    message += `\n  at ${makePath(base, issue.path)}: ${issue.message}`
  }
  return message
}

const IDENTIFIER_REGEX = /^[_$a-zA-Z][$\w]*$/

function makePath(base: string, path: (string | number)[]) {
  let result = base
  for (const item of path) {
    if (typeof item === 'number') {
      result += `[${item}]`
    } else if (IDENTIFIER_REGEX.test(item)) {
      result += `.${item}`
    } else {
      result += `[${JSON.stringify(item)}]`
    }
  }
  return result
}
