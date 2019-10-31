const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const TFA_STATE = 'tfa_state'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instance.
 **/
export const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken)
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
  // TFA_STATE
  getTfaState() {
    return localStorage.getItem(TFA_STATE)
  },
  setTfaState(state) {
    localStorage.setItem(TFA_STATE, state)
  },
  removeTfaState() {
    localStorage.removeItem(TFA_STATE)
  }
}
