export type BuildQueueItem =
  | ConfigQueueItem
  | DocumentQueueItem
  | AssetQueueItem

export interface ConfigQueueItem {
  type: 'CONFIG'
  path: string
}

export interface DocumentQueueItem {
  type: 'DOCUMENT'
  path: string
  referencedBy: string
}

export interface AssetQueueItem {
  type: 'ASSET'
  path: string
  referencedBy: string
}

export class BuildQueue {
  private items: BuildQueueItem[] = []
  private paths = new Set<string>()

  add(item: BuildQueueItem) {
    if (!this.paths.has(item.path)) {
      this.paths.add(item.path)
      this.items.push(item)
    }
  }

  remove(): BuildQueueItem | undefined {
    return this.items.shift()
  }
}
