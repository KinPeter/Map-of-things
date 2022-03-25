import { Circle } from '../Types/generator.types'

// Layout of the tiles
// To calculate required rows and columns, the number of circles (ROWS*COLUMNS*tile.length) must be higher than the total elements
export const ROWS = 8
export const COLUMNS = 16

// Determines the size multiplier of an image compared to the circle it's inside
export const IMG_SIZE_MULTIPLIER = 0.75

// Determines the size multiplier of basically everything
export const TILE_SIZE_MULTIPLIER = 2.5

// Calculated values of the whole image
export const TILE_SIZE = 500 * TILE_SIZE_MULTIPLIER // DO NOT CHANGE WITHOUT CHANGING THE CIRCLE SIZES!
export const TTL_WIDTH = TILE_SIZE * COLUMNS
export const TTL_HEIGHT = TILE_SIZE * ROWS

// One tile is one rectangle containing several circles. These tiles are laid out in rows and columns to fill the area
export const TILE: Circle[] = [
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
