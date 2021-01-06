export function getDescription($: cheerio.Root): string | undefined {
  const firstParagraph = $('p').eq(0).text()
  if (!firstParagraph) {
    return undefined
  } else {
    return firstParagraph.split('.')[0]
  }
}
