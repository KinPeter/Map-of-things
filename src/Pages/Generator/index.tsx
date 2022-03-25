import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { fileList as baseFileList } from '../../Data/fileList'
import { shuffle } from '../../Utils/generator.utils'
import { toJpeg } from 'html-to-image'
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
} from '../../Data/generatorVariables'

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

// Create an array with all the positions of the circles
const imagePositions: ImagePosition[] = new Array(ROWS)
  .fill(null)
  .map((_, rowIndex) => {
    return new Array(COLUMNS).fill(null).map((_, colIndex) => {
      return TILE.map(({ cx, cy, r }) => {
        return {
          x: cx + colIndex * TILE_SIZE,
          y: cy + rowIndex * TILE_SIZE,
          r,
        }
      })
    })
  })
  .flat(2)

// Apply unique size multipliers
const files: FileData[] = [...baseFileList]
Object.entries(multipliers).forEach(([id, value]) => {
  const file = files.find(file => file.id === Number(id))
  if (!file) throw new Error('File not found when attempted to add multiplier')
  file.multiplier = value
})

// Fill up the empty circles with random elements to achieve full coverage
const totalNumberOfCircles: number = ROWS * COLUMNS * TILE.length
const numOfEmptyCircles: number = totalNumberOfCircles - baseFileList.length
for (let i = 0; i < numOfEmptyCircles; i++) {
  const randomIndex = Math.floor(Math.random() * baseFileList.length)
  files.push(baseFileList[randomIndex])
}

// Shuffle the whole array to avoid too many similar categories to be too close to each other
shuffle(files)

const Generator = () => {
  // index to help add icon IDs to the circles
  let imageIdx: number = 0

  // toggle the stroke (outline) of the circles
  const [stroke, setStroke] = useState<'none' | 'grey'>('grey')
  const [svgVisible, setSvgVisible] = useState<boolean>(true)
  const toggleStroke = () => {
    setStroke(stroke === 'grey' ? 'none' : 'grey')
  }

  // Export the map (images) to a JPEG
  const ref = useRef(null)
  const [exportDisabled, setExportDisabled] = useState<boolean>(false)
  const [exportLabel, setExportLabel] = useState<string>('Export map to jpeg')
  const exportJpeg = useCallback(() => {
    if (ref.current === null) return
    setExportDisabled(true)
    setExportLabel('Exporting...')
    toJpeg(ref.current, { cacheBust: true, quality: 0.92, skipAutoScale: true, skipFonts: true })
      .then(dataUrl => {
        const link = document.createElement('a')
        link.download = 'icon-map.jpg'
        link.href = dataUrl
        link.click()
        setExportDisabled(false)
        setExportLabel('Export map to jpeg')
      })
      .catch(err => {
        console.log(err)
      })
  }, [ref])

  // Export the circles as SVG
  const exportSVG = () => {
    const elements = document.getElementsByTagName('svg')
    if (!elements[0]) return
    const svg = elements[0].outerHTML
      .replace(/style="[^"]+"/, '')
      .replace(/stroke="[^"]+"/, '')
      .replace(/class="[^"]+"/, '')
    const link = document.createElement('a')
    link.download = 'map-circles.svg'
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(svg)
    link.click()
  }

  return (
    <>
      <ImageContainer ref={ref} style={{ width: TTL_WIDTH, height: TTL_HEIGHT }}>
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
