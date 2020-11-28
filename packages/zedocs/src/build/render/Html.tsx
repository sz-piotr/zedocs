import { TocItem } from '../secondPass'
import { Body } from './Body'
import { Head } from './Head'

interface Props {
  title: string
  content: string
  toc: TocItem[]
}

export function Html({ title, content, toc }: Props) {
  return (
    <html lang="en">
      <Head title={title} />
      <Body toc={toc} content={content} />
    </html>
  )
}
