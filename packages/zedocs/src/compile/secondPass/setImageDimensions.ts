import { Artifacts } from '../Artifacts'

export function setImageDimensions($: cheerio.Root, artifacts: Artifacts) {
  $('img').each((i, el) => {
    const $el = $(el)
    const href = $el.attr('src')
    const output = artifacts.outputs.find((x) => x.targetPath === href)
    const { width, height } = output?.metadata ?? {}
    if (width) {
      $el.attr('width', width.toString())
    }
    if (height) {
      $el.attr('height', height.toString())
    }
  })
}
