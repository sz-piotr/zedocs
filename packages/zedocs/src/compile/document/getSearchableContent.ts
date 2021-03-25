export type SearchableContent = SearchableItem[]

interface SearchableItem {
  link: string
  heading: string
  content: string[]
}

const HEADING = 'h1, h2, h3, h4, h5, h6'

export function getSearchableContent(
  $: cheerio.Root,
  slug: string
): SearchableContent {
  return $(HEADING)
    .toArray()
    .map((el) => {
      const $el = $(el)
      const content = $el
        .nextUntil(HEADING)
        .toArray()
        .map((el) => $(el).text().trim())
        .filter((x) => x !== '')
      return {
        link: `${slug}#${$el.attr('id')}`,
        heading: $el.text(),
        content,
      }
    })
}
