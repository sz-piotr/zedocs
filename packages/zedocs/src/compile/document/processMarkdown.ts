import { sentenceCase } from 'change-case'
import cheerio from 'cheerio'
import path from 'path'
import { OutlineItem } from '../Artifacts'
import { addHeadingLinks } from './addHeadingLinks'
import { extractLinks } from './extractLinks'
import { getDescription } from './getDescription'
import { getOutline } from './getOutline'
import { makeTablesResponsive } from './makeTablesResponsive'
import { parseMarkdown } from './parseMarkdown'
import { updateExternalLinks } from './updateExternalLinks'

export interface ProcessedMarkdown {
  slug: string
  name: string
  description?: string
  content: string
  links: string[]
  warning?: string
  outline: OutlineItem[]
}

export function processMarkdown(
  asset: string,
  data: string
): ProcessedMarkdown {
  const directory = path.dirname(asset)
  const { html, frontMatter, warning } = parseMarkdown(data)

  const $ = cheerio.load(html)
  const slug = normalizeSlug(frontMatter.slug ?? path.parse(asset).name)
  const name =
    frontMatter.name ??
    ($('h1').eq(0).text() || sentenceCase(path.parse(slug).name))
  const description =
    frontMatter.description ?? (getDescription($) || undefined)
  const links = extractLinks($, directory)
  const outline = getOutline($)
  addHeadingLinks($)
  updateExternalLinks($)
  makeTablesResponsive($)

  return {
    slug,
    name,
    description,
    content: $('body').html() ?? '',
    links,
    warning,
    outline,
  }
}

function normalizeSlug(slug: string) {
  return path.posix.resolve('/', slug)
}
