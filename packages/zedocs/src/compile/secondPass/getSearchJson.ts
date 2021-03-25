import { Document, Output } from '../Artifacts'

export function getSearchJson(documents: Document[]): Output {
  const json = documents.map((document) => ({
    name: document.name,
    content: document.searchable,
  }))

  return {
    sourcePath: '',
    targetPath: '/search.json',
    content: JSON.stringify(json),
    metadata: {},
  }
}
