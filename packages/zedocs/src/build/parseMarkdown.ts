import MarkdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItFrontMatter from 'markdown-it-front-matter'
import { FrontMatter, parseFrontMatter } from './frontMatter'

interface MarkdownParseResult {
  html: string
  frontMatter: FrontMatter
  error: string | undefined
}

export function parseMarkdown(content: string): MarkdownParseResult {
  let frontMatter: FrontMatter = {}
  let error: string | undefined
  const html = new MarkdownIt()
    .use(MarkdownItContainer, 'info')
    .use(MarkdownItContainer, 'note')
    .use(MarkdownItContainer, 'warning')
    .use(MarkdownItFrontMatter, (fm: string) => {
      const result = parseFrontMatter(fm)
      frontMatter = result.frontMatter
      error = result.error
    })
    .render(content)
  return { html, frontMatter, error }
}
