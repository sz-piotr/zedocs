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
}

export class Artifacts {
  private _config?: Config
  documents: Document[] = []
  inputs: string[] = []
  outputs: Output[] = []

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
