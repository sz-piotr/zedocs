import { OutlineItem } from '../document'

export interface Project {
  name: string
  logo?: string
  logoDark?: string
}

export interface Document {
  title: string
  description?: string
  link: string
  html: string
  outline: OutlineItem[]
}
