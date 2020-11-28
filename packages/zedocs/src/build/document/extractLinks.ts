import path from 'path'

const HTTP_REGEX = /^https?:\/\//

export function extractLinks($: cheerio.Root, directory: string): string[] {
  const links: string[] = []
  $('a, img').each((i, el) => {
    const $el = $(el)
    const src = $el.attr('href') ?? $el.attr('src')
    if (src && !HTTP_REGEX.test(src)) {
      links.push(path.resolve(directory, src))
    }
  })
  return links
}
