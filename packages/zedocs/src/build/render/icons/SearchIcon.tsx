import { Icon } from './Icon'

interface Props {
  inline?: boolean
}

export function SearchIcon({ inline }: Props) {
  return (
    <Icon inline={inline} label="search">
      <circle cx="9" cy="9" r="8" />
      <path d="M15 15 L23 23" />
    </Icon>
  )
}
