import path from 'path'
import fsx from 'fs-extra'
import { exitWithError } from '../errors'
import { parseConfig } from './parse'

export interface Config {
  name: string
  contents: (Section | string)[]
  directory: string
}

export interface Section {
  section: string
  items: (Section | string)[]
}

export function loadConfig(filename: string | undefined): Config {
  const resolved = path.resolve(filename || 'zedocs.json')
  const directory = path.dirname(resolved)
  try {
    const content = fsx.readFileSync(resolved, 'utf-8')
    const json = JSON.parse(content)
    const parsed = parseConfig(json)
    return { ...parsed, directory }
  } catch (e) {
    exitWithError(resolved, e)
  }
}
