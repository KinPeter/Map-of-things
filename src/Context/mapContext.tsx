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
  areDetailsOpen: boolean
  setDetailsOpen: Dispatch<SetStateAction<boolean>>
  setTargetedItemId: Dispatch<SetStateAction<string>>
  filter: Category | undefined
  applyFilter: (filter: Category | undefined) => void
}

interface Props {
  children: ReactNode
}

const Context = createContext({} as ContextType)

const MapContext = ({ children }: Props) => {
  const [areDetailsOpen, setDetailsOpen] = useState<boolean>(false)
  const [targetedItemId, setTargetedItemId] = useState<string>('')
  const [filter, setFilter] = useState<Category | undefined>()
  // const [filteredItems, setFilteredItems] = useState<FileData[]>([])

  useEffect(() => {
    if (!targetedItemId || isNaN(Number(targetedItemId))) return

    const targeted = allItems.find(item => item.id === Number(targetedItemId))
    console.log(targeted)
    setTargetedItemId('')
  }, [targetedItemId])

  useEffect(() => {
    if (filter === undefined) {
      removeFilterClassFromShapes()
      // setFilteredItems([...allItems])
    } else {
      const filtered = allItems.filter(item => item.category === filter)
      // setFilteredItems(filtered)
      setFilterClassOnShapes(filtered)
    }
  }, [filter])

  const applyFilter = (filter: Category | undefined) => {
    setFilter(filter)
  }

  return (
    <Context.Provider
      value={{
        allItems,
        areDetailsOpen,
        setDetailsOpen,
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
