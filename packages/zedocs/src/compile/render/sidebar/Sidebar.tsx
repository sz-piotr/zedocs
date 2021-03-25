import { TocItem } from '../../secondPass'
import { DarkMode } from '../DarkMode'
import { PoweredBy } from './PoweredBy'
import { SidebarItems } from './SidebarItems'

interface Props {
  activeItem: string
  toc: TocItem[]
}

export function Sidebar({ toc, activeItem }: Props) {
  return (
    <>
      <input id="sidebar" className="sidebar__checkbox" type="checkbox" />
      <label htmlFor="sidebar" className="menu">
        <div className="menu__top" />
        <div className="menu__middle" />
        <div className="menu__bottom" />
      </label>
      <div className="sidebar">
        <div className="sidebar__icons">
          <DarkMode />
        </div>
        <nav className="sidebar__content">
          <SidebarItems toc={toc} activeItem={activeItem} />
        </nav>
        <PoweredBy />
      </div>
      <label htmlFor="sidebar" className="sidebar__shadow" />
    </>
  )
}
