import { useRef, useState } from 'react'
import styled from 'styled-components'
import { fileList as baseFileList } from '../../Data/fileList'
import {
  convertToJPGDataUrl,
  downloadJPG,
  exportSVGOverlay,
  getImagePositions,
  processFileList,
} from '../../Utils/generator.utils'
import { FileData, ImagePosition } from '../../Types/generator.types'
import { multipliers } from '../../Data/multipliers'
import GeneratorControls from '../../Components/GeneratorControls'
import {
  ROWS,
  COLUMNS,
  IMG_SIZE_MULTIPLIER,
  TILE_SIZE,
  TILE,
  TTL_WIDTH,
  TTL_HEIGHT,
} from '../../Utils/generator.variables'

const ImageContainer = styled.div`
  position: absolute;
  background-color: white;
`

const SVGContainer = styled.svg<{ stroke: string }>`
  position: absolute;

  circle.map-circle {
    fill: transparent;
    stroke: ${({ stroke }) => stroke};
  }
`

const imagePositions: ImagePosition[] = getImagePositions(ROWS, COLUMNS, TILE, TILE_SIZE)
const files: FileData[] = processFileList(baseFileList, ROWS, COLUMNS, TILE, multipliers)

const Generator = () => {
  const imageContainerRef = useRef(null)
  const svgContainerRef = useRef(null)
  const [stroke, setStroke] = useState<'none' | 'grey'>('grey')
  const [svgVisible, setSvgVisible] = useState<boolean>(true)
  const [exportDisabled, setExportDisabled] = useState<boolean>(false)
  const [exportLabel, setExportLabel] = useState<string>('Export map to jpeg')

  // index to help add icon IDs to the circles
  let imageIdx: number = 0

  // toggle the stroke (outline) of the circles
  const toggleStroke = () => {
    setStroke(stroke === 'grey' ? 'none' : 'grey')
  }

  // Export the map (images) to a JPEG
  const exportJpeg = async () => {
    if (!imageContainerRef.current) return
    setExportDisabled(true)
    setExportLabel('Exporting...')
    const dataUrl = await convertToJPGDataUrl(imageContainerRef.current as HTMLElement)
    downloadJPG(dataUrl)
    setExportDisabled(false)
    setExportLabel('Export map to jpeg')
  }

  // Export the circles as SVG
  const exportSVG = () => {
    if (!svgContainerRef?.current) return
    exportSVGOverlay(svgContainerRef.current as SVGElement)
  }

  return (
    <>
      <ImageContainer ref={imageContainerRef} style={{ width: TTL_WIDTH, height: TTL_HEIGHT }}>
        {files.map(({ filename, id, multiplier }, index) => {
          const { x, y, r } = imagePositions[index]
          const uniqueMultiplier = multiplier ?? 1
          const size = r * 2 * IMG_SIZE_MULTIPLIER * uniqueMultiplier
          return (
            <div
              key={`${filename}${index}`}
              id={id.toString()}
              style={{
                backgroundImage: `url(${filename})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                position: 'absolute',
                top: y - size / 2,
                left: x - size / 2,
                width: size,
                height: size,
              }}
            />
            // <img
            //   key={`${filename}${index}`}
            //   src={`${filename}`}
            //   id={id.toString()}
            //   alt="icon"
            //   style={{
            //     position: 'absolute',
            //     top: y - size / 2,
            //     left: x - size / 2,
            //     width: size,
            //     height: size,
            //   }}
            // />
          )
        })}
      </ImageContainer>
      <SVGContainer
        ref={svgContainerRef}
        width={TTL_WIDTH}
        height={TTL_HEIGHT}
        viewBox={`0 0 ${TTL_WIDTH} ${TTL_HEIGHT}`}
        stroke={stroke}
        style={{ display: svgVisible ? 'initial' : 'none' }}
      >
        {new Array(ROWS).fill(null).map((_, rowIndex) => {
          return new Array(COLUMNS).fill(null).map((_, colIndex) => {
            return TILE.map(({ cx, cy, r }, index) => (
              <circle
                key={`${colIndex}${index}`}
                cx={cx + colIndex * TILE_SIZE}
                cy={cy + rowIndex * TILE_SIZE}
                r={r}
                className="map-circle"
                data-item-id={files[imageIdx++]?.id}
              />
            ))
          })
        })}
      </SVGContainer>
      <GeneratorControls
        svgVisible={svgVisible}
        setSvgVisible={setSvgVisible}
        toggleStroke={toggleStroke}
        exportDisabled={exportDisabled}
        exportLabel={exportLabel}
        exportJpeg={exportJpeg}
        exportSVG={exportSVG}
      />
    </>
  )
}

export default Generator
