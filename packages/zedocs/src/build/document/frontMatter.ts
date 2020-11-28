import YAML from 'yaml'
import * as z from 'zod'
import { zodErrorToString } from '../../errors'

export interface FrontMatter {
  name?: string
  slug?: string
}

const frontMatterSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
})

export function parseFrontMatter(
  text: string
): { frontMatter: FrontMatter; error?: string } {
  try {
    const yaml = YAML.parse(text)
    const result = frontMatterSchema.safeParse(yaml)
    if (result.success) {
      return { frontMatter: result.data }
    } else {
      const error = zodErrorToString(
        'Front matter error',
        'frontMatter',
        result.error
      )
      return {
        frontMatter: {},
        error,
      }
    }
  } catch {
    return { frontMatter: {}, error: 'Front matter error. Cannot parse YAML.' }
  }
}
