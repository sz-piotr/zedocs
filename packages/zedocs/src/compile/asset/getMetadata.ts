import { OutputMetadata } from '../Artifacts'
import { imageSize } from 'image-size'

export function getMetadata(data: Buffer): OutputMetadata {
  try {
    const dimensions = imageSize(data)
    return {
      width: dimensions.width,
      height: dimensions.height
    }
  } catch {
    return {}
  }
}
