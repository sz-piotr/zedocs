import { resolve } from 'path'

export interface Config {
  name: string
  contents: (Section | string)[]
}

interface Section {
  section: string
  items: (Section | string)[]
}

export function loadConfig(config: string | undefined) {
  return require(resolve(config || 'zedocs.json'))
}
