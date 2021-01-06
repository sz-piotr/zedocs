import { Artifacts } from '../Artifacts'
import { Document, Project, render } from '../render'
import { getTableOfContents } from './getTableOfContents'
import { prepareHtml } from './prepareHtml'

export function buildSecondPass(artifacts: Artifacts, liveReload: boolean) {
  const toc = getTableOfContents(artifacts)
  const project: Project = {
    name: artifacts.config.name,
  }
  const outputs = artifacts.documents.map((artifact) => {
    const document: Document = {
      title: artifact.name,
      link: artifact.slug,
      outline: artifact.outline,
      html: prepareHtml(artifact, artifacts),
    }
    return {
      sourcePath: artifact.sourcePath,
      targetPath: artifact.targetPath,
      content: render(project, document, toc, liveReload),
      metadata: {}
    }
  })
  artifacts.outputs.push(...outputs)
}
