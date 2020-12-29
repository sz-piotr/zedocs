import path from 'path'

const HTTP_REGEX = /^https?:\/\//

export function replaceLinks(
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
