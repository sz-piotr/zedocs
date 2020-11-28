import cheerio from 'cheerio'
import path from 'path'
import { Document } from '../Artifacts'
import { TocItem } from '../secondPass'

export function renderDocument(
  document: Document,
  toc: TocItem[],
  linkMapping: Map<string, string>
) {
  const $ = cheerio.load(document.content)
  replaceLinks($, path.dirname(document.sourcePath), linkMapping)
  const html = $('body').html()

  return `
    <pre><code>${JSON.stringify(toc, null, 2)}</code></pre>
    ${html}
  `
}

const HTTP_REGEX = /^https?:\/\//

function replaceLinks(
  $: cheerio.Root,
  directory: string,
  linkMapping: Map<string, string>
) {
  $('a, img').each((i, el) => {
    const $el = $(el)
    const attr = $el.is('a') ? 'href' : 'src'
    const href = $el.attr(attr)
    if (href && !HTTP_REGEX.test(href)) {
      const fullPath = path.resolve(directory, href)
      const link = linkMapping.get(fullPath)
      if (link) {
        $el.attr(attr, link)
      }
    }
  })
}
