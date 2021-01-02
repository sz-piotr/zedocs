import { Icon } from './Icon'

interface Props {
  inline?: boolean
}

export function SunIcon({ inline }: Props) {
  return (
    <Icon inline={inline} fill label="moon">
      <path
        fillRule="evenodd"
        d="M14.1741 3.88622L12 0L9.82592 3.88622L6 1.6077L6.0603 6.0603L1.6077 6L3.88622 9.82592L0 12L3.88622 14.1741L1.6077 18L6.0603 17.9397L6 22.3923L9.82592 20.1138L12 24L14.1741 20.1138L18 22.3923L17.9397 17.9397L22.3923 18L20.1138 14.1741L24 12L20.1138 9.82592L22.3923 6L17.9397 6.0603L18 1.6077L14.1741 3.88622ZM12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z"
      />
      <circle cx="12" cy="12" r="5" />
    </Icon>
  )
}
