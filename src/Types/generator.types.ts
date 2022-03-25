import { Category } from '../Data/categories'

export interface Circle {
  cx: number
  cy: number
  r: number
}

export interface ImagePosition {
  x: number
  y: number
  r: number
}

export interface CircleComputedStyles {
  cx: string
  cy: string
  r: string
}

export interface FileData {
  id: number
  filename: string
  name: string
  category: Category | number
  multiplier?: number
}
