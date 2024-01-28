import path from 'path'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import { pathOutput, pathVue } from './build/paths.js'
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

const commonPlugins = [vue(), commonjs(), resolve(), babel({ babelHelpers: "bundled", exclude: "node_modules/**" })]

const getBuildConfig = () => {
  const config = {
    input: [
      path.resolve(pathVue, 'index.js'),
      path.resolve(pathVue, 'global.js'),
    ],
    output: [
      {
        format: 'es',
        dir: pathOutput,
        entryFileNames: `[name].js`
      },
      {
        format: 'es',
        dir: pathOutput,
        plugins: [terser()],
        entryFileNames: `[name].min.js`
      },
      {
        format: 'cjs',
        dir: pathOutput,
        entryFileNames: `[name].cjs`
      },
      {
        format: 'cjs',
        dir: pathOutput,
        plugins: [terser()],
        entryFileNames: `[name].min.cjs`
      },
    ],
    external: ["vue"],
    plugins: commonPlugins
  }
  return config;
}

const indexIifeConfig = {
  input: resolve(pathVue, 'index.js'),
  output: [
    {
      format: 'iife',
      dir: pathOutput,
      globals: {
        vue: 'Vue'
      },
      name: 'GyIconsVue',
      entryFileNames: `[name].iife.js`,
      inlineDynamicImports: true
    },
    {
      format: 'iife',
      dir: pathOutput,
      plugins: [terser()],
      globals: {
        vue: 'Vue'
      },
      name: 'GyIconsVue',
      entryFileNames: `[name].iife.min.js`,
      inlineDynamicImports: true
    },
  ],
  plugins: commonPlugins
} 

const globalIifeConfig = {
  input: resolve(pathVue, 'global.js'),
  output: [
    {
      format: 'iife',
      dir: pathOutput,
      globals: {
        vue: 'Vue'
      },
      name: 'GyIconsVue',
      entryFileNames: `[name].iife.js`,
      inlineDynamicImports: true
    },
    {
      format: 'iife',
      dir: pathOutput,
      plugins: [terser()],
      globals: {
        vue: 'Vue'
      },
      name: 'GyIconsVue',
      entryFileNames: `[name].iife.min.js`,
      inlineDynamicImports: true
    },
  ],
  plugins: commonPlugins
} 

export default [
  getBuildConfig(),
]