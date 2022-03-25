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
  svgVisible: boolean
  setSvgVisible: Dispatch<SetStateAction<boolean>>
  toggleStroke: () => void
  exportDisabled: boolean
  exportLabel: string
  exportJpeg: () => void
  exportSVG: () => void
}

const GeneratorControls = ({
  svgVisible,
  setSvgVisible,
  toggleStroke,
  exportSVG,
  exportDisabled,
  exportJpeg,
  exportLabel,
}: Props) => {
  return (
    <Wrapper>
      <button onClick={() => setSvgVisible(!svgVisible)}>Toggle SVG layer</button>
      <button onClick={toggleStroke} disabled={!svgVisible}>
        Toggle circle strokes
      </button>
      <button onClick={exportJpeg} disabled={exportDisabled}>
        {exportLabel}
      </button>
      <button onClick={exportSVG}>Export SVG layer</button>
    </Wrapper>
  )
}

export default GeneratorControls
