import { Output } from '../compile/Artifacts'
import { extname, dirname } from 'path'

interface ChangeListener {
  (paths: string[]): void
}

interface OutputItem {
  path: string
  type: string
  content: string | Buffer
}

export class Outputs {
  private items = new Map<string, OutputItem>()
  private listeners: ChangeListener[] = []

  update(outputs: Output[]) {
    const oldItems = [...this.items.values()]
    this.items.clear()

    for (const artifact of outputs) {
      const paths = [artifact.targetPath]
      const type = extname(artifact.targetPath)
      if (type === '.html') {
        paths.push(dirname(artifact.targetPath))
      }
      for (const path of paths) {
        this.items.set(path, { path, type, content: artifact.content })
      }
    }

    this.calculateChanges(oldItems, [...this.items.values()])
  }

  private calculateChanges(oldItems: OutputItem[], newItems: OutputItem[]) {
    const changes = newItems.map((item) => item.path)
    this.notifyChanges(changes)
  }

  private notifyChanges(changes: string[]) {
    for (const listener of this.listeners) {
      listener(changes)
    }
  }

  onChange(listener: ChangeListener): () => void {
    this.listeners.push(listener)
    return () => this.listeners.splice(this.listeners.indexOf(listener), 1)
  }

  get(path: string) {
    return this.items.get(path)
  }
}
