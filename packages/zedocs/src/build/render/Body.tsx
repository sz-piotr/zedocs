import { OutlineItem, TocItem } from '../secondPass'
import { TableOfContents } from './TableOfContents'

interface Props {
  link: string
  outline: OutlineItem[]
  toc: TocItem[]
  content: string
}

export function Body({ link, toc, content }: Props) {
  return (
    <body>
      <TableOfContents toc={toc} active={link} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <script type="module" src="/static/zedocs.js" />
    </body>
  )
}
