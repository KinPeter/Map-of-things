import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  ReactNode,
  createContext,
  useState,
} from 'react'
import { fileList as allItems } from '../Data/fileList'
import { Category } from '../Data/categories'
import { removeFilterClassFromShapes, setFilterClassOnShapes } from '../Utils/map.utils'
import { FileData } from '../Types/generator.types'

interface ContextType {
  allItems: FileData[]
  targetedItem: FileData | undefined
  deselectItem: () => void
  setTargetedItemId: Dispatch<SetStateAction<string>>
  filter: Category | undefined
  applyFilter: (filter: Category | undefined) => void
}

interface Props {
  children: ReactNode
}

const Context = createContext({} as ContextType)

const MapContext = ({ children }: Props) => {
  const [targetedItemId, setTargetedItemId] = useState<string>('')
  const [targetedItem, setTargetedItem] = useState<FileData | undefined>()
  const [filter, setFilter] = useState<Category | undefined>()

  useEffect(() => {
    if (!targetedItemId || isNaN(Number(targetedItemId))) return

    const targeted = allItems.find(item => item.id === Number(targetedItemId))
    setTargetedItem(targeted)
    setTargetedItemId('')
  }, [targetedItemId])

  useEffect(() => {
    if (filter === undefined) {
      removeFilterClassFromShapes()
    } else {
      const filtered = allItems.filter(item => item.category === filter)
      setFilterClassOnShapes(filtered)
    }
  }, [filter])

  const applyFilter = (filter: Category | undefined) => {
    setFilter(filter)
  }

  const deselectItem = () => {
    setTargetedItem(undefined)
    setTargetedItemId('')
  }

  return (
    <Context.Provider
      value={{
        allItems,
        targetedItem,
        deselectItem,
        setTargetedItemId,
        applyFilter,
        filter,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContextMap = () => {
  return useContext(Context)
}

export default MapContext
