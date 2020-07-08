// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './utils'
import ElementUI from 'element-ui'
import 'ie-placeholder'
import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2';
import '@/styles/index.scss' // global scss
import '@/permission' // permission control
import 'babel-polyfill'
import promise from 'es6-promise'
// import VueCropper from 'vue-cropper'
import Print from 'vue-print-nb'

Vue.use(Print);
promise.polyfill()

Vue.use(ElementUI)
Vue.use(VueClipboard)
// Vue.use(VueCropper)

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
