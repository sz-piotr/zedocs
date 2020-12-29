import { Icon } from './Icon'

interface Props {
  inline?: boolean
}

export function ArrowRightIcon({ inline }: Props) {
  return (
    <Icon inline={inline} label="left arrow">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Icon>
  )
}
