import { OutlineItem, TocItem } from '../secondPass'
import { Outline } from './Outline'

interface Props {
  content: string
  activeItem: string
  outline: OutlineItem[]
  toc: TocItem[]
}

export function Main({ content, outline }: Props) {
  return (
    <main>
      <Outline outline={outline} />
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  )
}
