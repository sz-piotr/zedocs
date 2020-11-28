import { TocItem } from '../secondPass'
import { Body } from './Body'
import { Head } from './Head'
import { Document, Project } from './types'

interface Props {
  project: Project
  document: Document
  toc: TocItem[]
}

export function Html({ project, document, toc }: Props) {
  return (
    <html lang="en">
      <Head title={`${document.title} - ${project.name}`} />
      <Body project={project} document={document} toc={toc} />
    </html>
  )
}
