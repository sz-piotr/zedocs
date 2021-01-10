import * as z from 'zod'
import { zodErrorToString } from '../../errors'
import { Section } from './Config'

const sectionSchema: z.ZodSchema<Section> = z
  .object({
    section: z.string(),
    items: z.array(z.union([z.string(), z.lazy(() => sectionSchema)])),
  })
  .strict()

const schema = z
  .object({
    name: z.string(),
    logo: z.string().optional(),
    logoDark: z.string().optional(),
    contents: z.array(z.union([z.string(), sectionSchema])),
  })
  .strict()

export function parseConfig(config: unknown) {
  const result = schema.safeParse(config)
  if (result.success) {
    return result.data
  } else {
    const message = zodErrorToString(
      'Configuration error',
      'config',
      result.error
    )
    throw new Error(message)
  }
}
