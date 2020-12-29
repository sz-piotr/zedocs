import { TocSection } from '../../secondPass'
import { SidebarItems } from './SidebarItems'

interface Props {
  item: TocSection
  activeItem: string
}

export function SidebarSection({ item, activeItem }: Props) {
  return (
    <li className="sidebar__section">
      <span className="sidebar__section-title">{item.name}</span>
      <SidebarItems toc={item.items} activeItem={activeItem} />
    </li>
  )
}
