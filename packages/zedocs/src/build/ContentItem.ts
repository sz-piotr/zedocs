export type ContentItem = DocumentItem | SectionItem

export interface DocumentItem {
  type: 'DOCUMENT'
  asset: string
}

export interface SectionItem {
  type: 'SECTION'
  name: string
  items: ContentItem[]
}
