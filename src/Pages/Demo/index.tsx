import ImageMap from '../../Components/ImageMap'
import { useContextMap } from '../../Context/mapContext'
import FloatingXButton from '../../Components/FloatingXButton'
import Menu from '../../Components/Menu'

const Demo = () => {
  const { filter, applyFilter } = useContextMap()

  return (
    <>
      <ImageMap />
      <Menu />
      {filter !== undefined ? <FloatingXButton onClick={() => applyFilter(undefined)} /> : null}
    </>
  )
}

export default Demo
