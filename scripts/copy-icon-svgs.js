/**
 * Script to copy the original SVG mat-icons from the Material Icons repository to a simpler folder structure
 */
const { readdirSync, mkdirSync, existsSync, copyFileSync } = require('fs')
const { resolve } = require('path')

const SRC = 'src'
const SVG = 'svg'
const MATERIAL_ICONS = 'materialicons'
const MATERIAL_ICONS_TWO_TONE = 'materialiconstwotone'

const categories = readdirSync(resolve(SRC))

categories.forEach(category => {
  if (!existsSync(resolve(SVG, category))) {
    mkdirSync(resolve(SVG, category))
  }
  const icons = readdirSync(resolve(SRC, category))
  icons.forEach(icon => {
    if (existsSync(resolve(SRC, category, icon, MATERIAL_ICONS, '24px.svg'))) {
      copyFileSync(
        resolve(SRC, category, icon, MATERIAL_ICONS, '24px.svg'),
        resolve(SVG, category, `${icon}.svg`)
      )
      console.log(`[+] Copied ${category}/${icon}.svg`)
    } else if (existsSync(resolve(SRC, category, icon, MATERIAL_ICONS_TWO_TONE, '24px.svg'))) {
      copyFileSync(
        resolve(SRC, category, icon, MATERIAL_ICONS_TWO_TONE, '24px.svg'),
        resolve(SVG, category, `${icon}.svg`)
      )
      console.log(`[+] Copied ${category}/${icon}.svg`)
    } else {
      console.log('Not exists:', resolve(SRC, category, icon, MATERIAL_ICONS))
    }
  })
})
