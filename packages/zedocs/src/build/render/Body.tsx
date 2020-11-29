import { TocItem } from '../secondPass'
import { Main } from './Main'
import { TableOfContents } from './TableOfContents'
import { Header } from './Header'
import { Document, Project } from './types'

interface Props {
  project: Project
  document: Document
  toc: TocItem[]
}

export function Body({ project, document, toc }: Props) {
  return (
    <body>
      <Header project={project} />
      <TableOfContents toc={toc} activeItem={document.link} />
      <Main document={document} toc={toc} />
      <script type="module" src="/static/zedocs.js" />
    </body>
  )
}
