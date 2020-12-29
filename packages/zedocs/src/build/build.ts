import { compile } from '../compile'
import { output } from './output'

export function build(configPath: string | undefined) {
  const artifacts = compile(configPath)
  output(artifacts)
}
