import { TocItem } from '../secondPass'

interface Props {
  toc: TocItem[]
}

export function TableOfContents({ toc }: Props) {
  return (
    <ul>
      {toc.map((item, i) =>
        item.type === 'DOCUMENT' ? (
          <li key={i}>
            <a href={item.link}>{item.name}</a>
          </li>
        ) : (
          <li key={i}>
            <span>{item.name}</span>
            <TableOfContents toc={item.items} />
          </li>
        )
      )}
    </ul>
  )
}
