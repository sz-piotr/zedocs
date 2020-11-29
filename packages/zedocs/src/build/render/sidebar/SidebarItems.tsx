import { TocItem } from '../../secondPass'
import { SidebarItem } from './SidebarItem'
import { SidebarSection } from './SidebarSection'

interface Props {
  activeItem: string
  toc: TocItem[]
}

export function SidebarItems({ toc, activeItem }: Props) {
  return (
    <ol className="sidebar__items">
      {toc.map((item, i) =>
        item.type === 'DOCUMENT' ? (
          <SidebarItem key={i} item={item} activeItem={activeItem} />
        ) : (
          <SidebarSection key={i} item={item} activeItem={activeItem} />
        )
      )}
    </ol>
  )
}
