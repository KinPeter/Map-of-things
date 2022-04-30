import ImageMap from '../../Components/ImageMap'
import { useContextMap } from '../../Context/mapContext'
import FloatingXButton from '../../Components/FloatingXButton'
import Menu from '../../Components/Menu'
import { IconModal } from '../../Components/Modal'
import { useContextModal } from '../../Context/modalContext'
import { useEffect } from 'react'
import WelcomeModal from '../../Components/Modal/WelcomeModal'

const Demo = () => {
  const { filter, applyFilter } = useContextMap()
  const { openInfoModal } = useContextModal()

  useEffect(() => {
    openInfoModal()
  }, [])

  return (
    <>
      <ImageMap />
      <Menu />
      {filter !== undefined ? <FloatingXButton onClick={() => applyFilter(undefined)} /> : null}
      <IconModal />
      <WelcomeModal />
    </>
  )
}

export default Demo
