import fsx from 'fs-extra'
import path from 'path'
import { errorToString } from '../errors'

type ReadFileBufferResult =
  | { success: true; data: Buffer }
  | { success: false; error: string }

export function readFileToBuffer(filename: string): ReadFileBufferResult {
  try {
    const data = fsx.readFileSync(filename)
    return { success: true, data }
  } catch (e) {
    return { success: false, error: errorToString(e) }
  }
}

type ReadFileStringResult =
  | { success: true; data: string }
  | { success: false; error: string }

export function readFileToString(filename: string): ReadFileStringResult {
  try {
    const data = fsx.readFileSync(filename, 'utf-8')
    return { success: true, data }
  } catch (e) {
    return { success: false, error: errorToString(e) }
  }
}

export function writeFile(filename: string, data: string | Buffer) {
  try {
    fsx.ensureDirSync(path.dirname(filename))
    fsx.writeFileSync(filename, data)
    return { success: true }
  } catch (e) {
    return { success: false, error: errorToString(e) }
  }
}
