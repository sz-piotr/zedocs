import { TocItem } from '../secondPass'

interface Props {
  activeItem: string
  toc: TocItem[]
}

export function TableOfContents({ toc, activeItem }: Props) {
  return (
    <ul>
      {toc.map((item, i) =>
        item.type === 'DOCUMENT' ? (
          <li key={i}>
            <a href={item.link}>
              {item.name} {activeItem === item.link && '(active)'}
            </a>
          </li>
        ) : (
          <li key={i}>
            <span>{item.name}</span>
            <TableOfContents toc={item.items} activeItem={activeItem} />
          </li>
        )
      )}
    </ul>
  )
}
