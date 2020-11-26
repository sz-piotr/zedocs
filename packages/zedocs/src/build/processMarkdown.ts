import { sentenceCase } from 'change-case'
import cheerio from 'cheerio'
import path from 'path'
import { extractLinks, RenderedLink } from './extractLinks'
import { parseMarkdown } from './parseMarkdown'

export interface ProcessedMarkdown {
  asset: string
  slug: string
  name: string
  html: cheerio.Cheerio
  links: RenderedLink[]
  warning?: string
}

export function processMarkdown(
  asset: string,
  data: string
): ProcessedMarkdown {
  const directory = path.dirname(asset)
  const { html, frontMatter, error } = parseMarkdown(data)

  const $ = cheerio.load(html)
  const slug = frontMatter.slug ?? path.parse(asset).name
  const name =
    frontMatter.name ??
    ($('h1').eq(0).text() || sentenceCase(path.parse(slug).name))
  const links = extractLinks($, directory)

  return {
    asset,
    slug,
    name,
    html: $('body'),
    links,
    warning: error,
  }
}
