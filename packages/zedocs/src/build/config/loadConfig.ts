import path from 'path'
import fsx from 'fs-extra'
import { exitWithError } from '../../errors'
import { parseConfig } from './parse'
import { Config } from './Config'

export function loadConfig(filename: string): Config {
  const directory = path.dirname(filename)
  try {
    const content = fsx.readFileSync(filename, 'utf-8')
    const json = JSON.parse(content)
    const parsed = parseConfig(json)
    return { ...parsed, directory }
  } catch (e) {
    exitWithError(filename, e)
  }
}
