import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.module'
import settings from './modules/settings.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    settings
  }
})


