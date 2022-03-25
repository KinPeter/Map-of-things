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
categories.forEach(category => {
  const icons = readdirSync(resolve(pngPath, category))
  icons.forEach(icon => {
    content += `  { id: ${id++}, filename: 'png/${category}/${icon}' },\n`
  })
})

content += ']\n'

writeFileSync(targetPath, content)
