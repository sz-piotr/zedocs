import { Config } from './config'

export interface Document {
  sourcePath: string
  targetPath: string
  slug: string
  name: string
  content: string
  outline: OutlineItem[]
}

export interface OutlineItem {
  name: string
  level: number
  link?: string
}

export interface Output {
  sourcePath: string
  targetPath: string
  content: Buffer | string
  metadata: OutputMetadata
}

export interface OutputMetadata {
  width?: number
  height?: number
}

export class Artifacts {
  private _config?: Config
  compileTimeMs = 0
  documents: Document[] = []
  inputs: string[] = []
  outputs: Output[] = []
  hasErrors = false
  hasWarnings = false

  get config() {
    if (!this._config) {
      throw new Error('Programmer error. Cannot get config!')
    }
    return this._config
  }

  set config(config: Config) {
    this._config = config
  }
}
