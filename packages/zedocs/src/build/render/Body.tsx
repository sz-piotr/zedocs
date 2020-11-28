import { TocItem } from '../secondPass'

interface Props {
  toc: TocItem[]
  content: string
}

export function Body({ toc, content }: Props) {
  return (
    <body>
      <pre>
        <code>{JSON.stringify(toc, null, 2)}</code>
      </pre>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <script type="module" src="/static/zedocs.js" />
    </body>
  )
}
