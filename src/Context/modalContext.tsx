import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useContextMap } from './mapContext'

interface ContextType {
  isOpen: boolean
  close: () => void
}

interface Props {
  children: ReactNode
}

const Context = createContext({} as ContextType)

const ModalContext = ({ children }: Props) => {
  const { targetedItem, deselectItem } = useContextMap()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (targetedItem && !isOpen) {
      setIsOpen(true)
    }
  }, [targetedItem])

  const close = () => {
    setIsOpen(false)
    deselectItem()
  }

  return (
    <Context.Provider
      value={{
        isOpen,
        close,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContextModal = () => {
  return useContext(Context)
}

export default ModalContext
