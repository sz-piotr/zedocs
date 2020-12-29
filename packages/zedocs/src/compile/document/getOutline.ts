export interface OutlineItem {
  name: string
  level: number
  link?: string
}

export function getOutline($: cheerio.Root) {
  const items: OutlineItem[] = []
  $('h1, h2, h3, h4, h5, h6').each((i, el) => {
    if (el.type === 'tag') {
      const $el = $(el)
      const level = parseInt(el.tagName[1])
      const name = $el.text()
      const id = $el.attr('id')
      items.push({
        name,
        level,
        link: id ? `#${id}` : undefined,
      })
    }
  })
  return items
}
