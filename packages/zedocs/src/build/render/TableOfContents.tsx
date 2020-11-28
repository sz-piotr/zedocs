import { TocItem } from '../secondPass'

interface Props {
  active: string
  toc: TocItem[]
}

export function TableOfContents({ toc, active }: Props) {
  return (
    <ul>
      {toc.map((item, i) =>
        item.type === 'DOCUMENT' ? (
          <li key={i}>
            <a href={item.link}>
              {item.name} {active === item.link && '(active)'}
            </a>
          </li>
        ) : (
          <li key={i}>
            <span>{item.name}</span>
            <TableOfContents toc={item.items} active={active} />
          </li>
        )
      )}
    </ul>
  )
}
