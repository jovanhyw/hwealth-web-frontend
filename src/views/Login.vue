<template>
  <v-container fill-height>
    <v-row align="center" justify="center" class="hidden-xs-only">
      <v-col cols="6" sm="3" lg="6" class="hidden-xs-only">
        <v-img src="/img/medicine.svg"></v-img>
      </v-col>

      <v-col cols="12" xs="12" sm="4" lg="5">
        <v-container fluid>
          <v-row no-gutters>
            <v-col align="center">
              <v-card tile flat>
                <v-card-title
                  class="title font-weight-bold font-weight-black font-italic black--text justify-center"
                  >Login</v-card-title
                >

                <v-divider></v-divider>

                <v-card-text>
                  <v-form @submit.prevent="login" v-model="validForm">
                    <v-text-field
                      label="Username"
                      prepend-icon="mdi-account"
                      v-model="username"
                      :rules="[notEmptyRule('Username')]"
                      filled
                      rounded
                      dense
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      prepend-icon="mdi-lock"
                      type="password"
                      autocomplete="off"
                      v-model="password"
                      :rules="[notEmptyRule('Password')]"
                      filled
                      rounded
                      dense
                    ></v-text-field>

                    <v-btn
                      color="primary"
                      type="submit"
                      :loading="btnLoading"
                      :disabled="!validForm"
                      rounded
                      >Login</v-btn
                    >
                  </v-form>

                  <div class="ma-2 subtitle-2">
                    <a href="/forgot-password">
                      <i>Forgot Password</i>
                    </a>
                  </div>

                  <div class="ma-2 subtitle-2">
                    <a href="/resend-email-token">
                      <i>Did not receive email verification</i>
                    </a>
                  </div>

                  <div class="ma-2 subtitle-2">
                    <a href="/account/recover">
                      <i>I lost access to my Authenticator device</i>
                    </a>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbarError" :timeout="0" bottom color="error">
      <span>{{ snackbarMessage }}</span>
      <v-btn
        text
        color="white"
        @click="
          {
            snackbarError = false
            snackbarMessage = ''
          }
        "
        >Close</v-btn
      >
    </v-snackbar>
  </v-container>
</template>

<script>
import { LOGIN } from '../store/modules/actions.type'
import { TokenService } from '@/services/storage.service'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      snackbarError: false,
      snackbarMessage: '',
      btnLoading: false,
      notEmptyRule(property) {
        return v => (v && v.length > 0) || `${property} cannot be empty.`
      },
      validForm: false
    }
  },
  methods: {
    login() {
      let username = this.username
      let password = this.password
      this.btnLoading = true
      this.$store
        .dispatch(LOGIN, { username, password })
        .then(res => {
          this.btnLoading = false

          /**
           * If account has 2FA enabled, direct to 2FA page
           */
          if (res.twoFactorEnabled) {
            TokenService.saveTfaAuth(false)
            return this.$router.push({ name: 'tfa' })
          }

          this.$router.push({ name: 'dashboard' })
        })
        .catch(err => {
          this.btnLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    }
  }
}
</script>

<style scoped>
.v-card {
  /* border: 4px solid #6200ea; */
  border-radius: 20px;
  background-image: url('/img/cool-background.png');
}
</style>
