import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.ts'
import './plugins/style.scss'
import http from './plugins/http'
Vue.filter('filterdate', function (value:string) {
  if (!value) return ''
  return value.slice(0,10)
})
Vue.filter('filtername', function (value:any,sertch:any) {
  if(!sertch){
    return value
  }
  let index = value.indexOf(sertch)
  if (!value) return ''
  return value.slice(0,index)
})
Vue.filter('filtername2', function (value:any,sertch:any) {
  if(!sertch){
    return ''
  }
  let index = value.indexOf(sertch)
  if (!value) return ''
  return value.slice(index+sertch.length)
})
Vue.config.productionTip = false
Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
