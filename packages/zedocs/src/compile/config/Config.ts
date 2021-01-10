export interface Config {
  name: string
  contents: (Section | string)[]
  logo?: string
  logoDark?: string
  directory: string
}

export interface Section {
  section: string
  items: (Section | string)[]
}
