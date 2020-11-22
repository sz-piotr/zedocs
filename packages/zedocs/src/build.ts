import path from 'path'
import fsx from 'fs-extra'
import { Config, Section } from './config'
import { processMarkdown } from './markdown'

export function build(config: Config) {
  const files = getFiles(config.directory, config.contents)
  const compiled = files.map((file) => {
    const content = fsx.readFileSync(file, 'utf-8')
    return processMarkdown(content, file)
  })
  const dist = path.join(config.directory, 'dist')
  fsx.removeSync(dist)
  for (const item of compiled) {
    console.log(item)
    const location = path.join(dist, item.slug, 'index.html')
    fsx.outputFileSync(location, item.html)
  }
}

function getFiles(directory: string, items: (Section | string)[]) {
  const files: string[] = []
  for (const item of items) {
    if (typeof item === 'string') {
      files.push(path.join(directory, item))
    } else {
      files.push(...getFiles(directory, item.items))
    }
  }
  return files
}
