import { OutlineItem } from '../secondPass'
import { ContentsIcon } from './icons'

interface Props {
  outline: OutlineItem[]
}

export function Outline({ outline }: Props) {
  if (outline.length === 0) {
    return null
  }
  return (
    <nav className="outline">
      <div className="outline__content">
        <span className="outline__title">
          <ContentsIcon inline /> Contents
        </span>
        <ol className="outline__items">
          {outline.map((item, i) => (
            <li
              key={i}
              className={`outline__item outline__item--level-${item.level}`}
            >
              <a href={item.link} className="outline__link">
                {item.name}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
