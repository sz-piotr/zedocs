import { Artifacts } from '../Artifacts'
import { renderDocument } from '../render'
import { getLinkMapping } from './getLinkMapping'
import { getTableOfContents } from './getTableOfContents'

export function buildSecondPass(artifacts: Artifacts) {
  const toc = getTableOfContents(artifacts)
  const linkMapping = getLinkMapping(artifacts)
  const outputs = artifacts.documents.map((document) => ({
    sourcePath: document.sourcePath,
    targetPath: document.targetPath,
    content: renderDocument(document, toc, linkMapping),
  }))
  artifacts.outputs.push(...outputs)
}
