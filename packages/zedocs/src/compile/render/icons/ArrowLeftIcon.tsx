import { Icon } from './Icon'

interface Props {
  inline?: boolean
}

export function ArrowLeftIcon({ inline }: Props) {
  return (
    <Icon inline={inline} label="left arrow">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Icon>
  )
}
