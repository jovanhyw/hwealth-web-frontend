import ApiService from '@/services/api.service'
//import { TokenService } from '../../services/storage.service'
// import { SET_USER, REMOVE_USER } from './mutations.type'
// import { LOGIN, LOGOUT } from './actions.type'

const state = {
  userProfile: null
}

const mutations = {
  setUserProfile: (state, userProfile) => (state.userProfile = userProfile)
}

const getters = {
  // getCurrentUser: state => state.user,
  // isAuthenticated: state => state.isAuthenticated,
  getUserProfile: state => state.userProfile
}

const actions = {
  fetchUserProfile({ commit }) {
    ApiService.setHeader()
    ApiService.get('/profile')
      .then(res => {
        console.log(res.data.profile)
        commit('setUserProfile', res.data)
      })
      .catch(err => console.log(err))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
