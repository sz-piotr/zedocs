import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItFrontMatter from 'markdown-it-front-matter'
import { FrontMatter, parseFrontMatter } from './frontMatter'
import { highlight } from './highlight'

interface MarkdownParseResult {
  html: string
  frontMatter: FrontMatter
  warning: string | undefined
}

export function parseMarkdown(content: string): MarkdownParseResult {
  let frontMatter: FrontMatter = {}
  let warning: string | undefined
  const html = new MarkdownIt({ highlight, html: true })
    .use(MarkdownItAnchor)
    .use(MarkdownItContainer, 'info')
    .use(MarkdownItContainer, 'note')
    .use(MarkdownItContainer, 'warning')
    .use(MarkdownItFrontMatter, (fm: string) => {
      const result = parseFrontMatter(fm)
      frontMatter = result.frontMatter
      warning = result.error
    })
    .render(content)
  return { html, frontMatter, warning }
}
