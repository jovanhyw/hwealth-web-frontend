import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ApiService from './services/api.service'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

Vue.config.productionTip = false

// Initialise API URL Path for Axios HTTP calls
ApiService.init(process.env.VUE_APP_API_URL)

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
