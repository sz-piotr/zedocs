import { Artifacts, Output } from '../Artifacts'
import { Document, Project, render } from '../render'
import { getTableOfContents } from './getTableOfContents'
import { prepareHtml } from './prepareHtml'

export function buildSecondPass(artifacts: Artifacts, liveReload: boolean) {
  const toc = getTableOfContents(artifacts)
  const project: Project = {
    name: artifacts.config.name,
    logo: getTargetPath(artifacts.config.logo, artifacts.outputs),
    logoDark: getTargetPath(artifacts.config.logoDark, artifacts.outputs),
  }
  const outputs = artifacts.documents.map((artifact) => {
    const document: Document = {
      title: artifact.name,
      link: artifact.slug,
      outline: artifact.outline,
      description: artifact.description,
      html: prepareHtml(artifact, artifacts),
    }
    return {
      sourcePath: artifact.sourcePath,
      targetPath: artifact.targetPath,
      content: render(project, document, toc, liveReload),
      metadata: {},
    }
  })
  artifacts.outputs.push(...outputs)
}

function getTargetPath(sourcePath: string | undefined, outputs: Output[]) {
  if (!sourcePath) {
    return undefined
  }
  return outputs.find((x) => x.sourcePath === sourcePath)?.targetPath
}
