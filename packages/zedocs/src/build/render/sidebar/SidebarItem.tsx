import { TocDocument } from '../../secondPass'

interface Props {
  item: TocDocument
  activeItem: string
}

export function SidebarItem({ item, activeItem }: Props) {
  const isActive = activeItem === item.link
  const className = isActive
    ? 'sidebar__item sidebar__item--active'
    : 'sidebar__item'
  return (
    <li className={className}>
      <a className="sidebar__link" href={item.link}>
        {item.name}
      </a>
    </li>
  )
}
