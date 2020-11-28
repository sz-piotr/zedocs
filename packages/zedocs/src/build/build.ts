import { resolve } from 'path'
import { Artifacts } from './Artifacts'
import { BuildQueue } from './BuildQueue'
import { processConfig } from './config'
import { processDocument } from './document'
import { processAsset } from './asset'
import { output } from './output'

export function build(configPath: string | undefined) {
  const artifacts = new Artifacts()
  const queue = new BuildQueue()
  queue.add({ type: 'CONFIG', path: resolve(configPath ?? 'zedocs.json') })

  for (let item = queue.remove(); item !== undefined; item = queue.remove()) {
    if (item.type === 'CONFIG') {
      processConfig(item, queue, artifacts)
    } else if (item.type === 'DOCUMENT') {
      processDocument(item, queue, artifacts)
    } else if (item.type === 'ASSET') {
      processAsset(item, artifacts)
    }
  }

  output(artifacts)
}
