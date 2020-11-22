import path from 'path'
import { sentenceCase } from 'change-case'
import cheerio from 'cheerio'
import MarkdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItFrontMatter from 'markdown-it-front-matter'
import YAML from 'yaml'

export interface RenderedMarkdown {
  file: string
  slug: string
  name: string
  html: cheerio.Cheerio
  links: RenderedLink[]
}

export interface RenderedLink {
  path: string
  update: (path: string) => void
}

const HTTP_REGEX = /^https?:\/\//

export function processMarkdown(content: string, file: string): RenderedMarkdown {
  const directory = path.dirname(file)

  let frontMatter: any = {}
  const html = new MarkdownIt()
    .use(MarkdownItContainer, 'info')
    .use(MarkdownItContainer, 'note')
    .use(MarkdownItContainer, 'warning')
    .use(MarkdownItFrontMatter, (fm: string) => {
      frontMatter = YAML.parse(fm)
    })
    .render(content)
  const $ = cheerio.load(html)
  const slug = frontMatter.slug ?? path.parse(file).name
  const name = frontMatter.name ?? ($('h1').eq(0).text() || sentenceCase(path.parse(slug).name))

  const links = extractLinks($, directory)

  return {
    file,
    slug,
    name,
    html: $('body'),
    links,
  }
}

function extractLinks($: cheerio.Root, directory: string) {
  const links: RenderedLink[] = []
  $('img').each((i, el) => {
    const $el = $(el)
    const src = $el.attr('src')
    if (src && !HTTP_REGEX.test(src)) {
      const absolute = path.join(directory, src)
      links.push({ path: absolute, update: (path) => $el.attr('src', path) })
    }
  })
  $('a').each((i, el) => {
    const $el = $(el)
    const src = $el.attr('href')
    if (src && !HTTP_REGEX.test(src)) {
      const absolute = path.join(directory, src)
      links.push({ path: absolute, update: (path) => $el.attr('href', path) })
    }
  })
  return links
}
