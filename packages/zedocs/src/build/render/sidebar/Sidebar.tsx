import { TocItem } from '../../secondPass'
import { SidebarItems } from './SidebarItems'

interface Props {
  activeItem: string
  toc: TocItem[]
}

export function Sidebar({ toc, activeItem }: Props) {
  return (
    <div className="sidebar">
      <nav className="sidebar__content">
        <SidebarItems toc={toc} activeItem={activeItem} />
      </nav>
    </div>
  )
}
