import { buildFirstPass } from './firstPass'
import { buildSecondPass } from './secondPass'

interface Options {
  liveReload?: boolean
}

export function compile(configPath: string | undefined, options?: Options) {
  const artifacts = buildFirstPass(configPath)
  if (!artifacts.hasErrors) {
    buildSecondPass(artifacts, !!options?.liveReload)
  }
  return artifacts
}
