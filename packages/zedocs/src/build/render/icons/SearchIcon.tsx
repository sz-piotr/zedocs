interface Props {
  inline?: boolean
}

export function SearchIcon({ inline }: Props) {
  return (
    <svg
      className={inline ? 'icon icon__inline' : 'icon'}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-label="search"
    >
      <circle cx="9" cy="9" r="8" />
      <path d="M15 15 L23 23" />
    </svg>
  )
}
