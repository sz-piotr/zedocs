import { ProcessedMarkdown } from './processMarkdown'
import { TocItem } from './TableOfContents'

export interface RenderedAsset {
  asset: string
  html: string
}

export function renderHtml(
  processed: ProcessedMarkdown[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tableOfContents: TocItem[]
) {
  return processed.map((x) => ({
    asset: x.asset,
    html: x.html.html() ?? '',
  }))
}
