import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { fileList as baseFileList } from '../../Data/fileList'
import {
  convertToJPGDataUrl,
  downloadFile,
  exportSVGImageMap,
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
import { useContextModal } from '../../Context/modalContext'
import FeatureInfoModal from '../../Components/Modal/FeatureInfoModal'

const ImageContainer = styled.div`
  position: absolute;
  background-color: white;
`

const ImageSVGContainer = styled.svg`
  position: absolute;
`

const OverlaySVGContainer = styled.svg<{ stroke: string }>`
  position: absolute;

  circle.map-circle {
    fill: transparent;
    stroke: ${({ stroke }) => stroke};
  }
`

const imagePositions: ImagePosition[] = getImagePositions(ROWS, COLUMNS, TILE, TILE_SIZE)
const files: FileData[] = processFileList(baseFileList, ROWS, COLUMNS, TILE, multipliers)

const Generator = () => {
  const { openInfoModal } = useContextModal()
  const imageContainerRef = useRef(null)
  const svgContainerRef = useRef(null)
  const [stroke, setStroke] = useState<'none' | 'grey'>('grey')
  const [svgOverlayVisible, setSvgOverlayVisible] = useState<boolean>(true)
  const [mapSvgMode, setMapSvgMode] = useState<boolean>(false)
  const [exportDisabled, setExportDisabled] = useState<boolean>(false)
  const [exportLabel, setExportLabel] = useState<string>('Export map to JPEG')

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      openInfoModal()
    }
  }, [])

  // Index to help add icon IDs to the circles
  let imageIdx: number = 0

  // Toggle the stroke (outline) of the circles
  const toggleStroke = () => {
    setStroke(stroke === 'grey' ? 'none' : 'grey')
  }

  // Export the map (images) to a JPEG
  // With a really high number of images (around 1500+) Chrome runs out of resources and fails to export JPG,
  // in this case use the SVG mode and convert to JPG manually
  const exportMapJpeg = async () => {
    if (!imageContainerRef.current) return
    setExportDisabled(true)
    setExportLabel('Exporting...')
    const dataUrl = await convertToJPGDataUrl(imageContainerRef.current as HTMLElement)
    downloadFile(dataUrl, 'map-images.jpg')
    setExportDisabled(false)
    setExportLabel('Export map to JPEG')
  }

  // Export the map (images) as an SVG
  // If you export the map as SVG you will need to convert it to JPG with some other tool, e.g. Gimp.
  // To properly open the file it needs to be next to the png/ folder due to the relative links (e.g. project/public/)
  const exportMapSVG = () => {
    if (!imageContainerRef.current) return
    exportSVGImageMap(imageContainerRef.current as SVGElement)
  }

  // Export the circles as SVG
  const exportOverlaySVG = () => {
    if (!svgContainerRef?.current) return
    exportSVGOverlay(svgContainerRef.current as SVGElement)
  }

  return (
    <>
      {mapSvgMode ? (
        <ImageSVGContainer
          ref={imageContainerRef}
          width={TTL_WIDTH}
          height={TTL_HEIGHT}
          viewBox={`0 0 ${TTL_WIDTH} ${TTL_HEIGHT}`}
        >
          {files.map(({ filename, id, multiplier }, index) => {
            const { x, y, r } = imagePositions[index]
            const uniqueMultiplier = multiplier ?? 1
            const size = r * 2 * IMG_SIZE_MULTIPLIER * uniqueMultiplier
            return (
              <image
                key={`${filename}${index}`}
                id={id.toString()}
                width={size}
                height={size}
                x={x - size / 2}
                y={y - size / 2}
                href={filename}
              />
            )
          })}
        </ImageSVGContainer>
      ) : (
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
              // It's possible to try with img elements, but some devs said div with background-image is more performant.
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
      )}
      <OverlaySVGContainer
        ref={svgContainerRef}
        width={TTL_WIDTH}
        height={TTL_HEIGHT}
        viewBox={`0 0 ${TTL_WIDTH} ${TTL_HEIGHT}`}
        stroke={stroke}
        style={{ display: svgOverlayVisible ? 'initial' : 'none' }}
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
      </OverlaySVGContainer>
      <GeneratorControls
        svgOverlayVisible={svgOverlayVisible}
        setSvgOverlayVisible={setSvgOverlayVisible}
        mapSvgMode={mapSvgMode}
        setMapSvgMode={setMapSvgMode}
        toggleStroke={toggleStroke}
        exportDisabled={exportDisabled}
        exportLabel={exportLabel}
        exportJpeg={exportMapJpeg}
        exportMapSVG={exportMapSVG}
        exportOverlaySVG={exportOverlaySVG}
      />
      <FeatureInfoModal />
    </>
  )
}

export default Generator
