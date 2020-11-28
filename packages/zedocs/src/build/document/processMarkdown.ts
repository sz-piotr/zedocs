import { sentenceCase } from 'change-case'
import cheerio from 'cheerio'
import path from 'path'
import { printWarning } from '../../errors'
import { extractLinks } from './extractLinks'
import { parseMarkdown } from './parseMarkdown'

export interface ProcessedMarkdown {
  slug: string
  name: string
  content: string
  links: string[]
}

export function processMarkdown(
  asset: string,
  data: string
): ProcessedMarkdown {
  const directory = path.dirname(asset)
  const { html, frontMatter, error } = parseMarkdown(data)
  if (error) {
    printWarning(asset, error)
  }

  const $ = cheerio.load(html)
  const slug = frontMatter.slug ?? path.parse(asset).name
  const name =
    frontMatter.name ??
    ($('h1').eq(0).text() || sentenceCase(path.parse(slug).name))
  const links = extractLinks($, directory)

  return {
    slug,
    name,
    content: html,
    links,
  }
}
