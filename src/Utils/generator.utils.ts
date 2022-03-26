import { Circle, FileData, ImagePosition } from '../Types/generator.types'
import { toJpeg } from 'html-to-image'

export function shuffle(array: unknown[]): unknown[] {
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export function getImagePositions(
  numOfRows: number,
  numOfColumns: number,
  tile: Circle[],
  tileSize: number
): ImagePosition[] {
  // Create an array with all the positions of the circles
  return new Array(numOfRows)
    .fill(null)
    .map((_, rowIndex) => {
      return new Array(numOfColumns).fill(null).map((_, colIndex) => {
        return tile.map(({ cx, cy, r }) => {
          return {
            x: cx + colIndex * tileSize,
            y: cy + rowIndex * tileSize,
            r,
          }
        })
      })
    })
    .flat(2)
}

export function processFileList(
  baseFileList: FileData[],
  numOfRows: number,
  numOfColumns: number,
  tile: Circle[],
  multipliers: Record<number, number>
): FileData[] {
  // Apply unique size multipliers
  const files: FileData[] = [...baseFileList]
  Object.entries(multipliers).forEach(([id, value]) => {
    const file = files.find(file => file.id === Number(id))
    if (!file) throw new Error('File not found when attempted to add multiplier')
    file.multiplier = value
  })

  // Fill up the empty circles with random elements to achieve full coverage
  const totalNumberOfCircles: number = numOfRows * numOfColumns * tile.length
  const numOfEmptyCircles: number = totalNumberOfCircles - baseFileList.length
  for (let i = 0; i < numOfEmptyCircles; i++) {
    const randomIndex = Math.floor(Math.random() * baseFileList.length)
    files.push(baseFileList[randomIndex])
  }

  // Shuffle the whole array to avoid too many similar categories to be too close to each other
  shuffle(files)

  return files
}

export function downloadFile(data: string, filename: string): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = data
  link.click()
}

export function exportSVGOverlay(element: SVGElement): void {
  const svg = element.outerHTML
    .replace(/style="[^"]+"/, '')
    .replace(/stroke="[^"]+"/, '')
    .replace(/class="[^"]+"/, '')
  downloadFile('data:text/plain;charset=utf-8,' + encodeURIComponent(svg), 'map-circles.svg')
}

export function exportSVGImageMap(element: SVGElement): void {
  const svg = element.outerHTML.replace(/class="[^"]+"/, '')
  downloadFile('data:text/plain;charset=utf-8,' + encodeURIComponent(svg), 'map-images.svg')
}

export async function convertToJPGDataUrl(element: HTMLElement): Promise<string> {
  return await toJpeg(element, {
    cacheBust: true,
    quality: 0.92,
    skipAutoScale: true,
    skipFonts: true,
  })
}
