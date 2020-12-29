import { Artifacts, Output } from '../compile/Artifacts'
import { join, extname } from 'path'

export function getOutputs(artifacts: Artifacts) {
  const output = new Map<string, Output>()
  for (const artifact of artifacts.outputs) {
    output.set(artifact.targetPath, artifact)
  }
  return output
}
export function getOutput(
  outputs: Map<string, Output>,
  path: string
): { content: string | Buffer; type: string } | undefined {
  let result = outputs.get(path)
  if (result) {
    const extension = extname(path)
    const content = result.content
    return { content, type: extension }
  } else {
    result = outputs.get(join(path, 'index.html'))
    if (result) {
      return { content: result.content, type: 'html' }
    }
  }
}
