import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'
import Chat from 'vue-beautiful-chat'
import moment from 'moment'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(Chat)
Vue.use(VueReCaptcha, { siteKey: '6LenTcEUAAAAAIeBxuneJHJXb0QWqw55vznSSN3E' }) // not sure if site key can be public

Vue.config.productionTip = false

// Initialise API URL Path for Axios HTTP calls
ApiService.init(process.env.VUE_APP_API_URL)
ApiService.mountInterceptor()

// If token exists, set header for axios
if (TokenService.getToken()) {
  ApiService.setHeader()
}

Vue.filter('prettyDOB', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMM YYYY')
  }
})

Vue.filter('formatDOB', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD')
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
