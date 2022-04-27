import ImageMap from '../../Components/ImageMap'
import { useContextMap } from '../../Context/mapContext'
import FloatingXButton from '../../Components/FloatingXButton'
import Menu from '../../Components/Menu'

const Demo = () => {
  const { filter, applyFilter, areDetailsOpen } = useContextMap()

  return (
    <>
      <ImageMap />
      <Menu />
      {filter !== undefined && !areDetailsOpen ? (
        <FloatingXButton onClick={() => applyFilter(undefined)} />
      ) : null}
      {/*<p>demo</p>*/}
      {/*<p>*/}
      {/*  <NavLink to="/generator">Generator</NavLink>*/}
      {/*</p>*/}
      {/*<p>*/}
      {/*  <NavLink to="/tile-editor">TileEditor</NavLink>*/}
      {/*</p>*/}
    </>
  )
}

export default Demo
