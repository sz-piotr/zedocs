import { sentenceCase } from 'change-case'
import cheerio from 'cheerio'
import path from 'path'
import { extractLinks, RenderedLink } from './extractLinks'
import { parseMarkdown } from './parseMarkdown'

export interface RenderedMarkdown {
  file: string
  slug: string
  name: string
  html: cheerio.Cheerio
  links: RenderedLink[]
  warnings: string[]
}

export function processMarkdown(
  content: string,
  file: string
): RenderedMarkdown {
  const directory = path.dirname(file)
  const { html, frontMatter, error } = parseMarkdown(content)
  const warnings = error ? [error] : []
  const $ = cheerio.load(html)
  const slug = frontMatter.slug ?? path.parse(file).name
  const name =
    frontMatter.name ??
    ($('h1').eq(0).text() || sentenceCase(path.parse(slug).name))
  const links = extractLinks($, directory)

  return {
    file,
    slug,
    name,
    html: $('body'),
    links,
    warnings,
  }
}
