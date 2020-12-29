import { Output } from '../compile/Artifacts'
import { extname, dirname } from 'path'

export class Outputs {
  private items = new Map<string, { content: string | Buffer; type: string }>()

  update(outputs: Output[]) {
    this.items.clear()
    for (const artifact of outputs) {
      const paths = [artifact.targetPath]
      const type = extname(artifact.targetPath)
      if (type === '.html') {
        paths.push(dirname(artifact.targetPath))
      }
      for (const path of paths) {
        this.items.set(path, { content: artifact.content, type })
      }
    }
  }

  get(path: string) {
    return this.items.get(path)
  }
}
