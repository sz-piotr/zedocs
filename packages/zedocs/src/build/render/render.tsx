import ReactDOMServer from 'react-dom/server'
import { OutlineItem, TocItem } from '../secondPass'
import { Html } from './Html'

export function render(
  title: string,
  link: string,
  content: string,
  outline: OutlineItem[],
  toc: TocItem[]
) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <Html
      title={title}
      link={link}
      content={content}
      outline={outline}
      toc={toc}
    />
  )
  return `<!DOCTYPE html>\n${html}\n`
}
