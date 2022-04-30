import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useContextMap } from './mapContext'

interface ContextType {
  isIconModalOpen: boolean
  closeIconModal: () => void
  isInfoModalOpen: boolean
  openInfoModal: () => void
  closeInfoModal: () => void
}

interface Props {
  children: ReactNode
}

const Context = createContext({} as ContextType)

const ModalContext = ({ children }: Props) => {
  const { targetedItem, deselectItem } = useContextMap()
  const [isIconModalOpen, setIsIconModalOpen] = useState<boolean>(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (targetedItem && !isIconModalOpen) {
      setIsIconModalOpen(true)
    }
  }, [targetedItem])

  const closeIconModal = () => {
    setIsIconModalOpen(false)
    deselectItem()
  }

  const openInfoModal = () => {
    setIsInfoModalOpen(true)
  }

  const closeInfoModal = () => {
    setIsInfoModalOpen(false)
  }

  return (
    <Context.Provider
      value={{
        isIconModalOpen,
        closeIconModal,
        isInfoModalOpen,
        openInfoModal,
        closeInfoModal,
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
