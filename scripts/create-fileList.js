/**
 * Script to generate the file list TS file for the map generator
 */
const { readdirSync, rmSync, existsSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const targetPath = resolve('..', 'src', 'Data', 'fileList.ts')
const pngPath = resolve('..', 'public', 'png')

if (existsSync(targetPath)) {
  rmSync(targetPath)
}

let content = `import { FileData } from '../Types/generator.types'

export const fileList: FileData[] = [
`

let id = 1
const categories = readdirSync(resolve(pngPath))
categories.forEach((category, categoryIndex) => {
  const icons = readdirSync(resolve(pngPath, category))
  icons.forEach(icon => {
    const name = icon.split('.png')[0]
    content += `  { id: ${id++}, filename: 'png/${category}/${icon}', name: '${name}', category: ${categoryIndex} },\n`
  })
})

content += ']\n'

writeFileSync(targetPath, content)
