import path from 'path'
import url from 'url'

const dir = path.dirname(url.fileURLToPath(import.meta.url))

export const pathRoot = path.resolve(dir, '..')
export const pathVue = path.resolve(pathRoot, './packages/vue')
export const pathSvg = path.resolve(pathRoot, './packages/svg')
export const pathComponents = path.resolve(pathVue, 'components')
export const pathOutput = path.resolve(pathRoot, 'dist')

