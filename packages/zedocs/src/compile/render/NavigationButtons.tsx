import { TocItem } from '../secondPass'
import { ArrowLeftIcon, ArrowRightIcon } from './icons'

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
  const previous = list[index - 1] as NavItem | undefined
  const next = list[index + 1] as NavItem | undefined

  const showPreviousSection =
    previous?.section && previous.section !== current.section
  const showNextSection = next?.section && next.section !== current.section

  const single = !!previous !== !!next

  return (
    <nav className={single ? 'page-links page-links--single' : 'page-links'}>
      {previous && (
        <a
          className="page-links__link page-links__link--previous"
          href={previous.link}
        >
          <ArrowLeftIcon />
          <span className="page-links__direction">
            {showPreviousSection && `${previous.section} — `}
            Previous
          </span>
          <span className="page-links__name">{previous.name}</span>
        </a>
      )}
      {next && (
        <a className="page-links__link page-links__link--next" href={next.link}>
          <ArrowRightIcon />
          <span className="page-links__direction">
            Next
            {showNextSection && ` — ${next.section}`}
          </span>
          <span className="page-links__name">{next.name}</span>
        </a>
      )}
    </nav>
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
