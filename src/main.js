import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import Chat from 'vue-beautiful-chat'

Vue.use(Chat)

Vue.config.productionTip = false

// Initialise API URL Path for Axios HTTP calls
ApiService.init("https://hwealth.herokuapp.com/api")
ApiService.mountInterceptor()

// If token exists, set header for axios
if (TokenService.getToken()) {
  ApiService.setHeader()
}

// Vee-Validate stuff
extend('required', {
  ...required,
  message: 'This field is required'
})

Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
