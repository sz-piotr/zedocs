import { buildFirstPass } from './firstPass'
import { buildSecondPass } from './secondPass'
import { output } from './output'

export function build(configPath: string | undefined) {
  const artifacts = buildFirstPass(configPath)
  buildSecondPass(artifacts)
  output(artifacts)
}
