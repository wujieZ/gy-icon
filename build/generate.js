import path from 'path'
import fs from 'fs/promises'
import { emptyDir, ensureDir } from 'fs-extra'
import consola from 'consola'
import camelcase from 'camelcase'
import glob from 'fast-glob'
import { format } from 'prettier'
import chalk from 'chalk'
import { pathComponents, pathSvg } from './paths.js'

consola.info(chalk.blue('generating vue components'))
await ensureDir(pathComponents)
await emptyDir(pathComponents)
const files = await getSvgFiles()

consola.info(chalk.blue('generating vue files'))
await Promise.all(files.map((file) => transformToVueComponent(file)))

consola.info(chalk.blue('generating entry file'))
await generateEntry(files)

async function getSvgFiles() {
  return glob('*.svg', { cwd: pathSvg, absolute: true })
}

function getName(file) {
  const filename = path.basename(file).replace('.svg', '')
  const componentName = camelcase(filename, { pascalCase: true })
  return {
    filename,
    componentName,
  }
}

function formatCode(code, parser = 'babel') {
  return format(code, {
    parser,
    semi: false,
    singleQuote: true,
  })
}

async function transformToVueComponent(file) {
  const content = await fs.readFile(file, 'utf-8')
  const { filename, componentName } = getName(file)
  const vue = await formatCode(
    `
<template>
${content}
</template>
<script>
export default {
  name: ${JSON.stringify(componentName)}
}
</script>`,
    'vue',
  )
  await fs.writeFile(path.resolve(pathComponents, `${filename}.vue`), vue, 'utf-8')
}

async function generateEntry(files) {
  const code = await formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file)
        return `export { default as ${componentName} } from './${filename}.vue'`
      })
      .join('\n'),
  )
  await fs.writeFile(path.resolve(pathComponents, 'index.js'), code, 'utf-8')
}
