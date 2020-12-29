import { OutlineItem } from '../document'
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
        <input id="outline" className="outline__checkbox" type="checkbox" />
        <label htmlFor="outline" className="outline__title">
          <ContentsIcon inline /> <span>Contents</span>
        </label>
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
