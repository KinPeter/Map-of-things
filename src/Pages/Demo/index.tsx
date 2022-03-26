import ImageMap from '../../Components/ImageMap'
import styled from 'styled-components'
import { useContextMap } from '../../Context/mapContext'
import FloatingXButton from '../../Components/FloatingXButton'

const Filter = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
`

const Demo = () => {
  const { filter, applyFilter, areDetailsOpen } = useContextMap()

  return (
    <>
      <ImageMap />
      <Filter onClick={() => applyFilter(0)}>Filter</Filter>
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
