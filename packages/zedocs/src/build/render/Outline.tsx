import { OutlineItem } from '../secondPass'

interface Props {
  outline: OutlineItem[]
}

export function Outline({ outline }: Props) {
  return (
    <ul>
      {outline.map((item, i) => (
        <li key={i}>
          {!item.link && <span>{item.name}</span>}
          {item.link && <a href={item.link}>{item.name}</a>}
        </li>
      ))}
    </ul>
  )
}
