import { OutlineItem } from '../secondPass'

export interface Project {
  name: string
}

export interface Document {
  title: string
  link: string
  html: string
  outline: OutlineItem[]
}
