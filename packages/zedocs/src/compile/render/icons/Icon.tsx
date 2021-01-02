import { ReactNode } from 'react'

interface Props {
  inline?: boolean
  size?: number
  fill?: boolean
  stroke?: number
  label: string
  children: ReactNode
}

export function Icon({
  inline,
  label,
  children,
  fill = false,
  size = 24,
  stroke = 2,
}: Props) {
  return (
    <svg
      className={inline ? 'icon icon--inline' : 'icon'}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'}
      strokeWidth={fill ? undefined : stroke}
      strokeLinejoin={fill ? undefined : 'round'}
      strokeLinecap={fill ? undefined : 'round'}
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  )
}
