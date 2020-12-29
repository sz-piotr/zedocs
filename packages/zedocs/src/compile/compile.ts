import { buildFirstPass } from './firstPass'
import { buildSecondPass } from './secondPass'

export function compile(configPath: string | undefined) {
  const artifacts = buildFirstPass(configPath)
  buildSecondPass(artifacts)
  return artifacts
}
