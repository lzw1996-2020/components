import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Test from 'lzwtest01'
// import 'lzwtest01/style/testComponent.css'
// Vue.use(Test)

import Sign from "lzw_components_sign"
import "lzw_components_sign/style/sign.css"
Vue.use(Sign)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
