import { resolve, dirname } from 'path'

export interface Config {
  name: string
  directory: string,
  contents: (Section | string)[]
}

interface Section {
  section: string
  items: (Section | string)[]
}

export function loadConfig(path: string | undefined): Config {
  const resolved = resolve(path || 'zedocs.json')
  const config = require(resolved)
  config.directory = dirname(resolved)
  return config
}
