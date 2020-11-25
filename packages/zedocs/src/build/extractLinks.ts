import path from 'path'

export interface RenderedLink {
  path: string
  update: (path: string) => void
}

const HTTP_REGEX = /^https?:\/\//

export function extractLinks($: cheerio.Root, directory: string) {
  const links: RenderedLink[] = []
  $('img').each((i, el) => {
    const $el = $(el)
    const src = $el.attr('src')
    if (src && !HTTP_REGEX.test(src)) {
      const absolute = path.join(directory, src)
      links.push({ path: absolute, update: (path) => $el.attr('src', path) })
    }
  })
  $('a').each((i, el) => {
    const $el = $(el)
    const src = $el.attr('href')
    if (src && !HTTP_REGEX.test(src)) {
      const absolute = path.join(directory, src)
      links.push({ path: absolute, update: (path) => $el.attr('href', path) })
    }
  })
  return links
}
