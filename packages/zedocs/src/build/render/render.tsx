import ReactDOMServer from 'react-dom/server'
import { Document } from '../Artifacts'
import { TocItem } from '../secondPass'
import { Html } from './Html'

export function render(document: Document, content: string, toc: TocItem[]) {
  const element = <Html title={document.name} content={content} toc={toc} />
  return `<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(element)}\n`
}
