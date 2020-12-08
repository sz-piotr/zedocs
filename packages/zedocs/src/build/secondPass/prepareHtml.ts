import cheerio from 'cheerio'
import path from 'path'
import { Document } from '../Artifacts'
import { replaceLinks } from './replaceLinks'

export function prepareHtml(
  document: Document,
  linkMapping: Map<string, string>
) {
  const $ = cheerio.load(document.content)
  replaceLinks($, path.dirname(document.sourcePath), linkMapping)
  return $('body').html() ?? ''
}
