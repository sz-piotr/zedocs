import path from 'path'
import fsx from 'fs-extra'
import { loadConfig } from '../config'
import { processMarkdown, RenderedMarkdown } from './processMarkdown'
import { processContents } from './processContents'

export function build(configPath: string | undefined) {
  const config = loadConfig(configPath)
  const contents = processContents(config.directory, config.contents)
  const compiled = contents.assets.map((file) => {
    const content = fsx.readFileSync(file, 'utf-8')
    return processMarkdown(content, file)
  })
  const dist = path.join(config.directory, 'dist')
  fsx.removeSync(dist)
  resolveLinks(compiled, config.directory)
  for (const item of compiled) {
    const location = path.join(dist, item.slug, 'index.html')
    fsx.outputFileSync(location, item.html.html())
  }
}

function resolveLinks(compiled: RenderedMarkdown[], directory: string) {
  const mapping: Record<string, string> = {}
  for (const item of compiled) {
    mapping[item.file] = path.posix.resolve('/', item.slug)
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
