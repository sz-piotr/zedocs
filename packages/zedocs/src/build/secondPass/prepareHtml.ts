import cheerio from 'cheerio'
import path from 'path'
import { Document } from '../Artifacts'
import { getOutline } from './getOutline'
import { replaceLinks } from './replaceLinks'

export function prepareHtml(
  document: Document,
  linkMapping: Map<string, string>
) {
  const $ = cheerio.load(document.content)
  replaceLinks($, path.dirname(document.sourcePath), linkMapping)
  const outline = getOutline($)
  const html = $('body').html() ?? ''
  return { html, outline }
}
