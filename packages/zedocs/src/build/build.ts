import path from 'path'
import fsx from 'fs-extra'
import { Config, loadConfig } from '../config'
import { processMarkdown, ProcessedMarkdown } from './processMarkdown'
import { processContents } from './processContents'
import { readFiles } from './readFiles'
import { printWarning } from '../errors'
import { File, makeFileList } from './makeFileList'
import { makeTableOfContents } from './makeTableOfContents'
import { RenderedAsset, renderHtml } from './renderHtml'

export function build(configPath: string | undefined) {
  const config = loadConfig(configPath)
  const contents = processContents(config.directory, config.contents)
  const inputFiles = readFiles(contents.assets)
  const { processed, warnings } = processFiles(inputFiles)
  printWarnings(warnings)
  const outputFiles = makeFileList(processed)
  printTargetWarnings(outputFiles)
  resolveLinks(processed, outputFiles)
  const tableOfContents = makeTableOfContents(contents.items, outputFiles)
  const rendered = renderHtml(processed, tableOfContents)
  saveOutput(config, outputFiles, rendered)
}

function saveOutput(
  config: Config,
  files: Map<string, File>,
  rendered: RenderedAsset[]
) {
  const dist = path.join(config.directory, 'dist')
  fsx.ensureDirSync(dist)
  fsx.emptyDirSync(dist)
  for (const item of files.values()) {
    const html = rendered.find((x) => x.asset === item.asset)?.html
    const dest = path.join(dist, item.target)
    fsx.ensureDir(path.dirname(dest))
    if (html) {
      fsx.outputFileSync(dest, html)
    } else {
      fsx.copyFileSync(item.asset, dest)
    }
  }
}

function processFiles(files: { asset: string; data: string }[]) {
  const processed = files.map((file) => processMarkdown(file.asset, file.data))
  const warnings: { asset: string; message: string }[] = []
  for (const item of processed) {
    if (item.warning) {
      warnings.push({ asset: item.asset, message: item.warning })
    }
  }
  return { processed, warnings }
}

function printWarnings(warnings: { asset: string; message: string }[]) {
  for (const warning of warnings) {
    printWarning(warning.asset, warning.message)
  }
}

function printTargetWarnings(files: Map<string, File>) {
  const items = Array.from(files.values())
  const duplicates = items.filter(
    (file) => items.filter((x) => x.target === file.target).length > 1
  )
  for (const file of duplicates) {
    printWarning(file.asset, `Duplicate target ${file.target}.`)
  }
}

function resolveLinks(
  processed: ProcessedMarkdown[],
  files: Map<string, File>
) {
  for (const item of processed) {
    for (const link of item.links) {
      const file = files.get(link.asset)
      if (file) {
        link.update(file.link)
      }
    }
  }
}
