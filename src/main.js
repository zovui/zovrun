import Vue from 'vue:esm'
import App from './App.vue'
import router from './router'
import store from './store'
import Zov from 'zov'
import './styles/index.scss'
// 应用ZOV
Vue.use(Zov)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
