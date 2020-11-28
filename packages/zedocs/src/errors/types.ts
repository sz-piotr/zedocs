export interface BuildError {
  path: string
  referencedBy?: string
  message: string
}

export interface BuildWarning {
  path: string
  referencedBy?: string
  message: string
}
