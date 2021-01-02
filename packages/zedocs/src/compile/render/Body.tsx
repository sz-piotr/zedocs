import { TocItem } from '../secondPass'
import { Main } from './Main'
import { Sidebar } from './sidebar/Sidebar'
import { Header } from './Header'
import { Document, Project } from './types'

interface Props {
  project: Project
  document: Document
  toc: TocItem[]
  liveReload: boolean
}

export function Body({ project, document, toc, liveReload }: Props) {
  return (
    <body>
      <Header project={project} />
      <Sidebar toc={toc} activeItem={document.link} />
      <Main document={document} toc={toc} />
      <script type="module" src="/static/zedocs.js" />
      {liveReload && <script src="http://localhost:35729/livereload.js" />}
    </body>
  )
}
