import { TocItem } from '../secondPass'
import { TableOfContents } from './TableOfContents'

interface Props {
  toc: TocItem[]
  content: string
}

export function Body({ toc, content }: Props) {
  return (
    <body>
      <TableOfContents toc={toc} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <script type="module" src="/static/zedocs.js" />
    </body>
  )
}
