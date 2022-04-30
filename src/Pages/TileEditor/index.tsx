import { CSSProperties, useEffect, useState } from 'react'
import { TILE_SIZE_MULTIPLIER, TILE_SIZE, TILE } from '../../Utils/generator.variables'
import { CircleComputedStyles } from '../../Types/generator.types'
import styled from 'styled-components'
import { useContextModal } from '../../Context/modalContext'
import FeatureInfoModal from '../../Components/Modal/FeatureInfoModal'

const Wrapper = styled.div`
  button {
    position: fixed;
    top: 10px;
    right: 10px;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 500px;
    opacity: 0.2;
  }

  svg {
    border: 1px solid black;

    circle {
      fill: transparent;
      stroke: black;
    }
  }
`

const TileEditor = () => {
  const { openInfoModal } = useContextModal()
  const [circles, setCircles] = useState<CircleComputedStyles[]>([])

  const getCircles = () => {
    setCircles(
      Array.from(document.getElementsByTagName('circle')).map(circle => {
        const { cx, cy, r } = getComputedStyle(circle) as unknown as CircleComputedStyles
        return { cx: cx.replace('px', ''), cy: cy.replace('px', ''), r: r.replace('px', '') }
      })
    )
  }

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      openInfoModal()
    }
  }, [])

  return (
    <Wrapper>
      <button onClick={getCircles}>Get circle positions</button>
      <img src="tile-sample.png" alt="tile" />
      <svg width={TILE_SIZE / TILE_SIZE_MULTIPLIER} height={TILE_SIZE / TILE_SIZE_MULTIPLIER}>
        {TILE.map(({ cx, cy, r }, index) => (
          <circle
            key={index}
            style={
              {
                cx: cx / TILE_SIZE_MULTIPLIER,
                cy: cy / TILE_SIZE_MULTIPLIER,
                r: r / TILE_SIZE_MULTIPLIER,
              } as CSSProperties
            }
          />
        ))}
      </svg>
      {circles.length ? (
        <div>
          {circles.map(({ cx, cy, r }, index) => {
            return <p key={index} style={{ margin: 0 }}>{`[${cx}, ${cy}, ${r}],`}</p>
          })}
        </div>
      ) : null}
      <FeatureInfoModal />
    </Wrapper>
  )
}

export default TileEditor
