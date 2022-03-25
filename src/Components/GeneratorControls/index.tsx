import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  position: fixed;
  top: 10px;
  left: 10px;

  button {
    padding: 4px 8px;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`

interface Props {
  svgOverlayVisible: boolean
  setSvgOverlayVisible: Dispatch<SetStateAction<boolean>>
  setMapSvgMode: Dispatch<SetStateAction<boolean>>
  mapSvgMode: boolean
  toggleStroke: () => void
  exportDisabled: boolean
  exportLabel: string
  exportJpeg: () => void
  exportOverlaySVG: () => void
  exportMapSVG: () => void
}

const GeneratorControls = ({
  svgOverlayVisible,
  setSvgOverlayVisible,
  mapSvgMode,
  setMapSvgMode,
  toggleStroke,
  exportOverlaySVG,
  exportMapSVG,
  exportDisabled,
  exportJpeg,
  exportLabel,
}: Props) => {
  return (
    <Wrapper>
      <button onClick={() => setSvgOverlayVisible(!svgOverlayVisible)}>Toggle SVG layer</button>
      <button onClick={toggleStroke} disabled={!svgOverlayVisible}>
        Toggle circle strokes
      </button>
      <button onClick={() => setMapSvgMode(!mapSvgMode)}>
        {mapSvgMode ? 'Map JPEG mode' : 'Map SVG mode'}
      </button>
      {mapSvgMode ? (
        <button onClick={exportMapSVG} disabled={exportDisabled}>
          Export map as SVG
        </button>
      ) : (
        <button onClick={exportJpeg} disabled={exportDisabled}>
          {exportLabel}
        </button>
      )}
      <button onClick={exportOverlaySVG}>Export SVG layer</button>
    </Wrapper>
  )
}

export default GeneratorControls
