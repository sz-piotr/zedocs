import { ReactNode } from 'react'

interface Props {
  inline?: boolean
  size?: number
  stroke?: number
  label: string
  children: ReactNode
}

export function Icon({
  inline,
  label,
  children,
  size = 24,
  stroke = 2,
}: Props) {
  return (
    <svg
      className={inline ? 'icon icon--inline' : 'icon'}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  )
}
