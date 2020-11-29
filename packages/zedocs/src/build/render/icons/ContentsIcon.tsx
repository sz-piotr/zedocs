import { Icon } from './Icon'

interface Props {
  inline?: boolean
}

export function ContentsIcon({ inline }: Props) {
  return (
    <Icon inline={inline} label="contents">
      <line x1="21" y1="10" x2="7" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="21" y1="18" x2="7" y2="18" />
    </Icon>
  )
}
