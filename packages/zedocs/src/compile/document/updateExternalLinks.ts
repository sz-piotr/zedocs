const HTTP_REGEX = /^https?:\/\//

export function updateExternalLinks($: cheerio.Root) {
  $('a').each((i, el) => {
    const $el = $(el)
    const href = $el.attr('href')
    if (href && HTTP_REGEX.test(href)) {
      $el.attr('rel', 'noopener noreferrer')
      $el.attr('target', '_blank')
    }
  })
}
