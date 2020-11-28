import { Artifacts } from '../Artifacts'
import { render } from '../render'
import { getLinkMapping } from './getLinkMapping'
import { getTableOfContents } from './getTableOfContents'
import { prepareHtml } from './prepareHtml'

export function buildSecondPass(artifacts: Artifacts) {
  const toc = getTableOfContents(artifacts)
  const linkMapping = getLinkMapping(artifacts)
  const outputs = artifacts.documents.map((document) => {
    const { html, outline } = prepareHtml(document, linkMapping)
    return {
      sourcePath: document.sourcePath,
      targetPath: document.targetPath,
      content: render(document.name, document.slug, html, outline, toc),
    }
  })
  artifacts.outputs.push(...outputs)
}
