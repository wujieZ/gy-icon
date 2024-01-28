/* eslint-disable import/no-default-export */
import * as icons from './components'

export default (app) => {
  for (const [key, component] of Object.entries(icons)) {
    app.component('GyIcon' + key, component)
  }
}

export { icons }
export * from './components'
