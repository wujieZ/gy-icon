import Vue from 'vue'
import GyIcons from '../../packages/vue/src/global'
import App from './App.vue'

Vue.use(GyIcons);

new vue({
    el: '#app',
    render: h => h(App)
})
