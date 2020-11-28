import path from 'path'
import { Artifacts } from '../Artifacts'

export function findAvailableTarget(asset: string, artifacts: Artifacts) {
  const { name, ext } = path.parse(asset)
  const n = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const suffix = n === 0 ? '' : `-${n}`
    const target = path.posix.join('/static', `${name}${suffix}${ext}`)
    let unique = true
    for (const file of artifacts.outputs) {
      if (file.targetPath === target) {
        unique = false
        break
      }
    }
    if (unique) {
      return target
    }
  }
}
