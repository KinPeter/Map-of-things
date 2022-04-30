import styled from 'styled-components'
import { useContextModal } from '../../Context/modalContext'
import { useContextMap } from '../../Context/mapContext'
import { Category } from '../../Data/categories'
import { ReactNode, useEffect, useState } from 'react'

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(150, 150, 150, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease;

  &.open {
    opacity: 1;
  }
`

const ModalElement = styled.div`
  width: 500px;
  max-width: 90vw;
  height: min-content;
  max-height: 90vh;
  background-color: white;
  border-radius: 20px;
  padding: 2em;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  overflow: auto;

  opacity: 0;
  transform: translateY(20%);
  transition: all 0.3s ease;

  &.open {
    opacity: 1;
    transform: translateY(0);
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .image {
    width: 170px;
    height: 170px;
    background-position: center;
    background-size: contain;
  }

  h1 {
    font-size: 1.25em;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0.25em;
  }

  p {
    margin-bottom: 0.25em;
  }
`

const categories = Object.keys(Category).filter(cat => isNaN(Number(cat)))

export const IconModal = () => {
  const { isIconModalOpen, closeIconModal } = useContextModal()
  const { targetedItem } = useContextMap()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isIconModalOpen) setTimeout(() => setOpen(true))
  }, [isIconModalOpen])

  if (!isIconModalOpen) return null

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      closeIconModal()
    }, 500)
  }

  return (
    <ModalWrapper className={open ? 'open' : ''} onMouseDown={handleClose}>
      <ModalElement className={open ? 'open' : ''} onMouseDown={handleClose}>
        {targetedItem && (
          <ModalContent>
            <div className="image" style={{ backgroundImage: `url(${targetedItem.filename})` }} />
            <h1>{targetedItem.name}</h1>
            <p>{categories[targetedItem.category]}</p>
          </ModalContent>
        )}
      </ModalElement>
    </ModalWrapper>
  )
}

export const InfoModal = ({ children }: { children: ReactNode }) => {
  const { isInfoModalOpen, closeInfoModal } = useContextModal()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isInfoModalOpen) setTimeout(() => setOpen(true))
  }, [isInfoModalOpen])

  if (!isInfoModalOpen) return null

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      closeInfoModal()
    }, 500)
  }

  return (
    <ModalWrapper className={open ? 'open' : ''} onMouseDown={handleClose}>
      <ModalElement className={open ? 'open' : ''} onMouseDown={handleClose}>
        <ModalContent>{children}</ModalContent>
      </ModalElement>
    </ModalWrapper>
  )
}
