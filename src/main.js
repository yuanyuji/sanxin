import Vue from 'vue'

import router from './router/router.js'
import axios from './http/axios.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import {store} from './store/store.js'

import './static/css/reset.css'
import './static/css/font-awesome.min.css'
import './static/css/style.css'
import App from './views/App.vue'

new Vue({
  el: '.container',
  store,
  router,
  render (createElement) {
    return createElement(App)
  }
})
if (module.hot.accept) {
  module.hot.accept()
}