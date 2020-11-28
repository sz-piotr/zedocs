import { OutlineItem, TocItem } from '../secondPass'
import { NavigationButtons } from './NavigationButtons'
import { Outline } from './Outline'

interface Props {
  content: string
  activeItem: string
  outline: OutlineItem[]
  toc: TocItem[]
}

export function Main({ content, outline, activeItem, toc }: Props) {
  return (
    <main>
      <Outline outline={outline} />
      <article dangerouslySetInnerHTML={{ __html: content }} />
      <NavigationButtons activeItem={activeItem} toc={toc} />
    </main>
  )
}
