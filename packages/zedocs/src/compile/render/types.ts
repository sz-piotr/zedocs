import { OutlineItem } from '../document'

export interface Project {
  name: string
}

export interface Document {
  title: string
  description?: string
  link: string
  html: string
  outline: OutlineItem[]
}
