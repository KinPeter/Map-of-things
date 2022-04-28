/**
 * Script to generate the shell script to convert the original SVG mat-icons into PNG format with resizing them.
 * For the conversion use the librsvg2 and librsvg2-tools libs in Linux.
 */
const { readdirSync, mkdirSync, rmSync, existsSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const PNG = 'png'
const SVG = 'svg'

if (existsSync(resolve('convert.sh'))) {
  rmSync(resolve('convert.sh'))
}

let commands = '#!/bin/bash \n\n'

const categories = readdirSync(resolve(SVG))
categories.forEach(category => {
  const icons = readdirSync(resolve(SVG, category))

  if (!existsSync(resolve(PNG, category))) {
    mkdirSync(resolve(PNG, category))
  }

  icons.forEach(icon => {
    const iconName = icon.split('.svg')[0]
    commands += `rsvg-convert -z=20 -o=${resolve(PNG, category, `${iconName}.png`)} ${resolve(
      SVG,
      category,
      icon
    )}\n`
  })
})

writeFileSync(resolve('convert.sh'), commands)
