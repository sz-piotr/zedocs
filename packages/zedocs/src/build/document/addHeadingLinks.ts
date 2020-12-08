export function addHeadingLinks($: cheerio.Root) {
  $('h1, h2, h3, h4, h5, h6').each((i, el) => {
    const $el = $(el)
    const id = $el.attr('id')
    $el.append(` <a class="heading-link" href="#${id}">#</a>`)
    $el.html(`<div>${$el.html()}</div>`)
  })
}
