import * as z from 'zod'
import { Section } from './config'

const sectionSchema: z.ZodSchema<Section> = z
  .object({
    section: z.string(),
    items: z.array(z.union([z.string(), z.lazy(() => sectionSchema)])),
  })
  .strict()

const schema = z
  .object({
    name: z.string(),
    contents: z.array(z.union([z.string(), sectionSchema])),
  })
  .strict()

export function parseConfig(config: unknown) {
  const result = schema.safeParse(config)
  if (result.success) {
    return result.data
  } else {
    throw new Error(issuesToMessage(result.error.issues))
  }
}

function issuesToMessage(issues: z.ZodIssue[]) {
  let message = 'Configuration error. The following issues were found:'
  for (const issue of issues) {
    message += `\n  at ${makePath(issue.path)}: ${issue.message}`
  }
  return message
}

const IDENTIFIER_REGEX = /^[_$a-zA-Z][$\w]*$/

function makePath(path: (string | number)[]) {
  let result = 'config'
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
