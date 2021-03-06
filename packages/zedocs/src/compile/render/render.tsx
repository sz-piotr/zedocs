import ReactDOMServer from 'react-dom/server'
import { TocItem } from '../secondPass'
import { Html } from './Html'
import { Document, Project } from './types'

export function render(
  project: Project,
  document: Document,
  toc: TocItem[],
  liveReload: boolean
) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <Html
      project={project}
      document={document}
      toc={toc}
      liveReload={liveReload}
    />
  )
  return `<!DOCTYPE html>\n${html}\n`
}
