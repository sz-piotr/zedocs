import { TocItem } from '../secondPass'
import { NavigationButtons } from './NavigationButtons'
import { Outline } from './Outline'
import { Document } from './types'

interface Props {
  document: Document
  toc: TocItem[]
}

export function Main({ document, toc }: Props) {
  return (
    <main>
      <Outline outline={document.outline} />
      <article
        className="article"
        dangerouslySetInnerHTML={{ __html: document.html }}
      />
      <NavigationButtons activeItem={document.link} toc={toc} />
    </main>
  )
}
