import { Artifacts } from '../Artifacts'
import { Document, Project, render } from '../render'
import { getLinkMapping } from './getLinkMapping'
import { getTableOfContents } from './getTableOfContents'
import { prepareHtml } from './prepareHtml'

export function buildSecondPass(artifacts: Artifacts) {
  const toc = getTableOfContents(artifacts)
  const linkMapping = getLinkMapping(artifacts)
  const project: Project = {
    name: artifacts.config.name,
  }
  const outputs = artifacts.documents.map((artifact) => {
    const document: Document = {
      title: artifact.name,
      link: artifact.slug,
      outline: artifact.outline,
      html: prepareHtml(artifact, linkMapping),
    }
    return {
      sourcePath: artifact.sourcePath,
      targetPath: artifact.targetPath,
      content: render(project, document, toc),
    }
  })
  artifacts.outputs.push(...outputs)
}
