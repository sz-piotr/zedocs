import { Icon } from './Icon'

interface Props {
  inline?: boolean
}

export function MoonIcon({ inline }: Props) {
  return (
    <Icon inline={inline} fill label="moon">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Icon>
  )
}
