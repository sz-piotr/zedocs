import { OutlineItem, TocItem } from '../secondPass'
import { Main } from './Main'
import { TableOfContents } from './TableOfContents'

interface Props {
  activeItem: string
  outline: OutlineItem[]
  toc: TocItem[]
  content: string
}

export function Body({ activeItem, toc, outline, content }: Props) {
  return (
    <body>
      <TableOfContents toc={toc} activeItem={activeItem} />
      <Main
        content={content}
        toc={toc}
        activeItem={activeItem}
        outline={outline}
      />
      <script type="module" src="/static/zedocs.js" />
    </body>
  )
}
