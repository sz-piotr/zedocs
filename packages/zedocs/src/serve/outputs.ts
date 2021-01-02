import { Output } from '../compile/Artifacts'
import { extname, dirname } from 'path'

interface ChangeListener {
  (paths: string[]): void
}

interface OutputItem {
  type: string
  content: string | Buffer
}

export class Outputs {
  private items = new Map<string, OutputItem>()
  private listeners: ChangeListener[] = []

  update(outputs: Output[]) {
    const oldItems = new Map(this.items)
    this.items.clear()

    for (const artifact of outputs) {
      const paths = [artifact.targetPath]
      const type = extname(artifact.targetPath)
      if (type === '.html') {
        paths.push(dirname(artifact.targetPath))
      }
      for (const path of paths) {
        this.items.set(path, { type, content: artifact.content })
      }
    }

    this.calculateChanges(oldItems, this.items)
  }

  private calculateChanges(
    oldItems: Map<string, OutputItem>,
    newItems: Map<string, OutputItem>
  ) {
    const changes = [...oldItems.keys()].filter(
      (key) => !contentEquals(oldItems.get(key), newItems.get(key))
    )
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

function contentEquals(a: OutputItem | undefined, b: OutputItem | undefined) {
  if (!a || !b) {
    return false
  }
  if (typeof a.content === 'string') {
    return a.content === b.content
  } else {
    if (typeof b.content === 'string') {
      return false
    }
    return a.content.equals(b.content)
  }
}
