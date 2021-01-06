export function makeTablesResponsive($: cheerio.Root) {
  $('table').each((i, el) => {
    const $el = $(el)
    $el.wrap('<div class="table">')
  })
}
