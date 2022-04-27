import { FileData } from '../Types/generator.types'
import { FILTER_OUT_CLASSNAME, MAP_CIRCLE_CLASS_SELECTOR } from '../Data/imageMap'

export function setFilterClassOnShapes(filteredItems: FileData[]): void {
  const filteredIds = filteredItems.map(m => m.id)
  document.querySelectorAll(MAP_CIRCLE_CLASS_SELECTOR).forEach(shape => {
    const id = Number((shape as HTMLElement).dataset.itemId)
    if (filteredIds.includes(id)) {
      shape.classList.remove(FILTER_OUT_CLASSNAME)
    } else {
      setTimeout(() => {
        shape.classList.add(FILTER_OUT_CLASSNAME)
      })
    }
  })
}

export function removeFilterClassFromShapes(): void {
  document.querySelectorAll(MAP_CIRCLE_CLASS_SELECTOR).forEach(shape => {
    shape.classList.remove(FILTER_OUT_CLASSNAME)
  })
}
