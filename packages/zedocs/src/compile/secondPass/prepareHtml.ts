import cheerio from 'cheerio'
import path from 'path'
import { Artifacts, Document } from '../Artifacts'
import { getLinkMapping } from './getLinkMapping'
import { replaceLinks } from './replaceLinks'
import { setImageDimensions } from './setImageDimensions'

export function prepareHtml(document: Document, artifacts: Artifacts) {
  const linkMapping = getLinkMapping(artifacts)
  const $ = cheerio.load(document.content)
  replaceLinks($, path.dirname(document.sourcePath), linkMapping)
  setImageDimensions($, artifacts)
  return $('body').html() ?? ''
}
