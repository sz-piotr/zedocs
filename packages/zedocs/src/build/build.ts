import path from 'path'
import fsx from 'fs-extra'
import { loadConfig } from '../config'
import { processMarkdown, ProcessedMarkdown } from './processMarkdown'
import { processContents } from './processContents'
import { readFiles } from './readFiles'
import { printWarning } from '../errors'

export function build(configPath: string | undefined) {
  const config = loadConfig(configPath)
  const contents = processContents(config.directory, config.contents)
  const files = readFiles(contents.assets)
  const processed = files.map((file) => processMarkdown(file.asset, file.data))
  printWarnings(processed)
  const dist = path.join(config.directory, 'dist')
  fsx.removeSync(dist)
  resolveLinks(processed, config.directory)
  for (const item of processed) {
    const location = path.join(dist, item.slug, 'index.html')
    fsx.outputFileSync(location, item.html.html())
  }
}

function printWarnings(processed: ProcessedMarkdown[]) {
  for (const item of processed) {
    for (const warning of item.warnings) {
      printWarning(item.asset, warning)
    }
  }
}

function resolveLinks(compiled: ProcessedMarkdown[], directory: string) {
  const mapping: Record<string, string> = {}
  for (const item of compiled) {
    mapping[item.asset] = path.posix.resolve('/', item.slug)
  }
  for (const item of compiled) {
    for (const link of item.links) {
      if (!mapping[link.path]) {
        const name = path.posix.join('/static', path.basename(link.path))
        fsx.mkdirpSync(path.join(directory, 'dist/static'))
        fsx.copyFileSync(link.path, path.join(directory, 'dist', name))
        mapping[link.path] = name
      }
      link.update(mapping[link.path])
    }
  }
}
