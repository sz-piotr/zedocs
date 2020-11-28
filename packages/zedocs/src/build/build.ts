import { buildFirstPass } from './firstPass'
import { output } from './output'

export function build(configPath: string | undefined) {
  const artifacts = buildFirstPass(configPath)
  output(artifacts)
}
