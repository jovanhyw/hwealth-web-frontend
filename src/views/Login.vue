<template>
  <div class="login">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img src="/img/medicine.svg"></v-img>
        </v-col>

        <v-col cols="4" offset="1">
          <v-container fluid>
            <v-row no-gutters>
              <v-col align="center">
                <v-card shaped class="elevation-4">
                  <v-card-title
                    class="display-1 font-weight-bold font-weight-black font-italic blue-grey--text justify-center"
                    >Login</v-card-title
                  >

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-form @submit.prevent="login">
                      <v-text-field
                        label="Username"
                        prepend-icon="mdi-account"
                        v-model="username"
                      ></v-text-field>
                      <v-text-field
                        label="Password"
                        prepend-icon="mdi-lock"
                        type="password"
                        autocomplete="off"
                        v-model="password"
                      ></v-text-field>

                      <v-btn
                        block
                        dark
                        color="deep-purple accent-4"
                        type="submit"
                        :loading="btnLoading"
                        >Login</v-btn
                      >
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

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
  </div>
</template>


<script>
import { LOGIN } from '../store/modules/actions.type'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      snackbarError: false,
      snackbarMessage: '',
      btnLoading: false
    }
  },
  methods: {
    login() {
      let username = this.username
      let password = this.password
      this.btnLoading = true
      this.$store
        .dispatch(LOGIN, { username, password })
        .then(() => {
          this.btnLoading = false
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
  border-left: 4px solid #6200ea;
  border-right: 4px solid #6200ea;
}
</style>
