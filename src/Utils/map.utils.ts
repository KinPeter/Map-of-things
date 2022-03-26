import { FileData } from '../Types/generator.types'
import { MAP_CIRCLE_CLASSNAME } from '../Data/imageMap'

export function setFilterClassOnShapes(filteredItems: FileData[]): void {
  const filteredIds = filteredItems.map(m => m.id)
  document.querySelectorAll(MAP_CIRCLE_CLASSNAME).forEach(shape => {
    const id = Number((shape as HTMLElement).dataset.itemId)
    if (filteredIds.includes(id)) {
      shape.classList.remove('filter-out')
    } else {
      setTimeout(() => {
        shape.classList.add('filter-out')
      })
    }
  })
}

export function removeFilterClassFromShapes(): void {
  document.querySelectorAll(MAP_CIRCLE_CLASSNAME).forEach(shape => {
    shape.classList.remove('filter-out')
  })
}
