import { useCallback, useRef, useState, CSSProperties } from 'react'
import { fileList as baseFileList } from '../../Data/fileList'
import { shuffle } from '../../Utils/generator.utils'
import { toJpeg } from 'html-to-image'
import { Circle, CircleComputedStyles, FileData, ImagePosition } from '../../Types/generator.types'
import './styles.css'

// Layout of the tiles
// To calculate required rows and columns, the number of circles (ROWS*COLUMNS*tile.length) must be higher than the total elements
const ROWS = 6
const COLUMNS = 10

// Determines the size multiplier of an image compared to the circle it's inside
const IMG_SIZE_MULTIPLIER = 0.875

// Determines the size multiplier of basically everything
const TILE_SIZE_MULTIPLIER = 3

// Calculated values of the whole image
const TILE_SIZE = 500 * TILE_SIZE_MULTIPLIER // DO NOT CHANGE WITHOUT CHANGING THE CIRCLE SIZES!
const TTL_WIDTH = TILE_SIZE * COLUMNS
const TTL_HEIGHT = TILE_SIZE * ROWS

// One tile is one rectangle containing several circles. These tiles are laid out in rows and columns to fill the area
const tile: Circle[] = [
  // cx, cy, r of each circle in a tile
  [44, 44, 44],
  [177, 143, 120],
  [30, 117, 30],
  [30, 186, 30],
  [271, 28, 28],
  [360, 75, 73],
  [463, 37, 37],
  [460, 128, 39],
  [53, 267, 53],
  [132, 286, 27],
  [203, 309, 47],
  [382, 265, 118],
  [92, 408, 92],
  [261, 421, 78],
  [397, 441, 59],
  [470, 385, 30],
  [474, 474, 26],
].map(([cx, cy, r]) => ({
  // To get the final positions and sizes of the circles take the multiplier into consideration
  cx: cx * TILE_SIZE_MULTIPLIER,
  cy: cy * TILE_SIZE_MULTIPLIER,
  r: r * TILE_SIZE_MULTIPLIER,
}))

// Create an array with all the positions of the circles
const imagePositions: ImagePosition[] = new Array(ROWS)
  .fill(null)
  .map((_, rowIndex) => {
    return new Array(COLUMNS).fill(null).map((_, colIndex) => {
      return tile.map(({ cx, cy, r }) => {
        return {
          x: cx + colIndex * TILE_SIZE,
          y: cy + rowIndex * TILE_SIZE,
          r,
        }
      })
    })
  })
  .flat(2)

// Fill up the empty circles with random elements to achieve full coverage
const files: FileData[] = [...baseFileList]
const totalNumberOfCircles: number = ROWS * COLUMNS * tile.length
const numOfEmptyCircles: number = totalNumberOfCircles - baseFileList.length
for (let i = 0; i < numOfEmptyCircles; i++) {
  const randomIndex = Math.floor(Math.random() * baseFileList.length)
  files.push(baseFileList[randomIndex])
}

// Shuffle the whole array to avoid too many similar motifs to be too close to each other
shuffle(files)

const Generator = () => {
  // index to help add motif IDs to the circles
  let imageIdx: number = 0

  // switch this to 'edit tile mode'
  const GENERATE_MODE: boolean = true

  // toggle the stroke (outline) of the circles
  const toggleStroke = () => {
    const root: HTMLElement | null = document.querySelector(':root')
    if (!root) return
    const stroke = getComputedStyle(root).getPropertyValue('--stroke')
    root.style.setProperty('--stroke', stroke === 'grey' ? 'none' : 'grey')
  }
  const [svgVisible, setSvgVisible] = useState<boolean>(true)

  // TILE EDIT MODE stuff
  const [circles, setCircles] = useState<CircleComputedStyles[]>([])
  const getCircles = () => {
    setCircles(
      Array.from(document.getElementsByTagName('circle')).map(circle => {
        const { cx, cy, r } = getComputedStyle(circle) as unknown as CircleComputedStyles
        return { cx: cx.replace('px', ''), cy: cy.replace('px', ''), r: r.replace('px', '') }
      })
    )
  }

  // Export the motif map (images) to a JPEG
  const ref = useRef(null)
  const [exportDisabled, setExportDisabled] = useState<boolean>(false)
  const [exportLabel, setExportLabel] = useState<string>('Export map to jpeg')
  const exportJpeg = useCallback(() => {
    if (ref.current === null) return
    setExportDisabled(true)
    setExportLabel('Exporting...')
    toJpeg(ref.current, { cacheBust: true, quality: 1 })
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
    const svg = elements[0].outerHTML.replace(/style="[^"]+"/, '')
    const link = document.createElement('a')
    link.download = 'map-circles.svg'
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(svg)
    link.click()
  }

  return GENERATE_MODE ? (
    <div className="App">
      <div
        ref={ref}
        className="image-container"
        style={{ width: TTL_WIDTH, height: TTL_HEIGHT, position: 'absolute' }}
      >
        {files.map(({ filename, id, multiplier }, index) => {
          const { x, y, r } = imagePositions[index]
          const sizeMultiplier = multiplier ?? IMG_SIZE_MULTIPLIER
          const size = r * 2 * sizeMultiplier
          return (
            <img
              key={`${filename}${index}`}
              src={`motivum/${filename}`}
              id={id.toString()}
              alt="motif"
              style={{
                position: 'absolute',
                top: y - size / 2,
                left: x - size / 2,
                width: size,
                height: size,
              }}
            />
          )
        })}
      </div>
      <svg
        width={TTL_WIDTH}
        height={TTL_HEIGHT}
        viewBox={`0 0 ${TTL_WIDTH} ${TTL_HEIGHT}`}
        style={{ position: 'absolute', display: svgVisible ? 'initial' : 'none' }}
      >
        {new Array(ROWS).fill(null).map((_, rowIndex) => {
          return new Array(COLUMNS).fill(null).map((_, colIndex) => {
            return tile.map(({ cx, cy, r }, index) => (
              <circle
                key={`${colIndex}${index}`}
                cx={cx + colIndex * TILE_SIZE}
                cy={cy + rowIndex * TILE_SIZE}
                r={r}
                className="map-circle"
                data-motif-id={files[imageIdx++]?.id}
              />
            ))
          })
        })}
      </svg>
      <div className="controls fixed-left">
        <button onClick={() => setSvgVisible(!svgVisible)}>Toggle SVG layer</button>
        <button onClick={toggleStroke} disabled={!svgVisible}>
          Toggle circle strokes
        </button>
        <button onClick={exportJpeg} disabled={exportDisabled}>
          {exportLabel}
        </button>
        <button onClick={exportSVG}>Export SVG layer</button>
      </div>
    </div>
  ) : (
    // TILE EDIT MODE
    <div className="App">
      <button className="fixed-right" onClick={getCircles}>
        Get circle positions
      </button>
      <img
        src="tile-sample.png"
        alt="tile"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '500px',
          height: '500px',
          opacity: 0.2,
        }}
      />
      <svg
        width={TILE_SIZE / TILE_SIZE_MULTIPLIER}
        height={TILE_SIZE / TILE_SIZE_MULTIPLIER}
        style={{ border: '1px solid black' }}
      >
        {tile.map(({ cx, cy, r }, index) => (
          <circle
            key={index}
            style={
              {
                cx: cx / TILE_SIZE_MULTIPLIER,
                cy: cy / TILE_SIZE_MULTIPLIER,
                r: r / TILE_SIZE_MULTIPLIER,
                fill: 'transparent',
                stroke: 'black',
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
    </div>
  )
}

export default Generator
