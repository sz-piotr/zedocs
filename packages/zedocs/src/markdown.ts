import path from 'path'
import { sentenceCase } from 'change-case'
import cheerio from 'cheerio'
import MarkdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItFrontMatter from 'markdown-it-front-matter'
import YAML from 'yaml'

export function processMarkdown(content: string, filename: string) {
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
  const slug = frontMatter.slug ?? path.parse(filename).name
  const name = frontMatter.name ?? ($('h1').eq(0).text() || sentenceCase(path.parse(slug).name))
  return {
    slug,
    name,
    html,
  }
}
