import { TocItem } from '../secondPass'

interface Props {
  activeItem: string
  toc: TocItem[]
}

export function NavigationButtons({ toc, activeItem }: Props) {
  const list = tocToList(toc)
  const index = list.findIndex((x) => x.link === activeItem)
  if (index === -1 || list.length < 2) {
    return null
  }
  const current = list[index]
  const previous: NavItem | undefined = list[index - 1]
  const next: NavItem | undefined = list[index + 1]

  return (
    <>
      {previous && (
        <a href={previous.link}>
          <span>
            {previous.section !== current.section && `${previous.section} -`}{' '}
            Previous
          </span>
          <strong>{previous.name}</strong>
        </a>
      )}
      {next && (
        <a href={next.link}>
          <span>
            Next {next.section !== current.section && `- ${next.section}`}
          </span>
          <strong>{next.name}</strong>
        </a>
      )}
    </>
  )
}

interface NavItem {
  name: string
  section: string
  link: string
}

function tocToList(toc: TocItem[], section = '') {
  const items: NavItem[] = []
  for (const item of toc) {
    if (item.type === 'DOCUMENT') {
      items.push({
        name: item.name,
        link: item.link,
        section,
      })
    } else {
      items.push(...tocToList(item.items, item.name))
    }
  }
  return items
}
