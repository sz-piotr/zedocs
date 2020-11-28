import fsx from 'fs-extra'
import path from 'path'
import { errorToString } from '../../errors'
import { Config } from './Config'
import { parseConfig } from './parse'

type LoadConfigResult =
  | { success: true; data: Config }
  | { success: false; error: string }

export function loadConfig(filename: string): LoadConfigResult {
  const directory = path.dirname(filename)
  try {
    const content = fsx.readFileSync(filename, 'utf-8')
    const json = JSON.parse(content)
    const parsed = parseConfig(json)
    return { success: true, data: { ...parsed, directory } }
  } catch (e) {
    return { success: false, error: errorToString(e) }
  }
}
