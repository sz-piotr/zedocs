import { OutlineItem, TocItem } from '../secondPass'
import { Body } from './Body'
import { Head } from './Head'

interface Props {
  title: string
  link: string
  content: string
  outline: OutlineItem[]
  toc: TocItem[]
}

export function Html({ title, link, outline, content, toc }: Props) {
  return (
    <html lang="en">
      <Head title={title} />
      <Body link={link} outline={outline} toc={toc} content={content} />
    </html>
  )
}
