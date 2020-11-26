export type TocItem = TocDocumentItem | TocSectionItem

export interface TocDocumentItem {
  type: 'DOCUMENT'
  link: string
}

export interface TocSectionItem {
  type: 'SECTION'
  name: string
  items: TocItem[]
}
