import { TocItem } from '../secondPass'
import { Body } from './Body'
import { Head } from './Head'
import { Document, Project } from './types'

interface Props {
  project: Project
  document: Document
  toc: TocItem[]
  liveReload: boolean
}

export function Html({ project, document, toc, liveReload }: Props) {
  return (
    <html lang="en">
      <Head
        title={document.title}
        site={project.name}
        description={document.description}
      />
      <Body
        project={project}
        document={document}
        toc={toc}
        liveReload={liveReload}
      />
    </html>
  )
}
