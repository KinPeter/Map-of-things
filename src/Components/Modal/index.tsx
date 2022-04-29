import styled from 'styled-components'
import { useContextModal } from '../../Context/modalContext'
import { useContextMap } from '../../Context/mapContext'

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

  .icon-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .image {
      width: 170px;
      height: 170px;
      background-position: center;
      background-size: contain;
    }
  }
`

const Modal = () => {
  const { isOpen, close } = useContextModal()
  const { targetedItem } = useContextMap()

  if (!isOpen) return null

  return (
    <ModalWrapper onClick={close}>
      <ModalElement onClick={close}>
        {targetedItem && (
          <div className="icon-info">
            <div className="image" style={{ backgroundImage: `url(${targetedItem.filename})` }} />
            <p>{targetedItem.name}</p>
            <p>{targetedItem.category}</p>
          </div>
        )}
      </ModalElement>
    </ModalWrapper>
  )
}

export default Modal
