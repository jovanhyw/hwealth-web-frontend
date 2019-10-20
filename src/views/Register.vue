<template>
  <div class="register">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img src="/img/doctors.svg"></v-img>
        </v-col>

        <v-col cols="4" offset="1">
          <v-container fluid>
            <v-row no-gutters>
              <v-col align="center">
                <v-card shaped class="elevation-4">
                  <v-card-title
                    class="display-1 font-weight-bold font-weight-black font-italic blue-grey--text justify-center"
                    >Register with us!</v-card-title
                  >

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-form @submit.prevent="validateForm">
                      <v-text-field
                        label="Full Name"
                        prepend-icon="mdi-account-badge-horizontal"
                        v-model="accountInfo.fullname"
                      ></v-text-field>

                      <v-text-field
                        label="Username"
                        prepend-icon="mdi-account"
                        v-model="accountInfo.username"
                      ></v-text-field>
                      <v-text-field
                        label="Password"
                        prepend-icon="mdi-lock"
                        type="password"
                        autocomplete="off"
                        v-model="accountInfo.password"
                      ></v-text-field>
                      <v-text-field
                        label="Email"
                        prepend-icon="mdi-email"
                        v-model="accountInfo.email"
                      ></v-text-field>
                      <v-btn
                        block
                        dark
                        color="deep-purple accent-4"
                        type="submit"
                        :loading="btnLoading"
                        >Register</v-btn
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

    <v-snackbar v-model="snackbarSuccess" :timeout="0" bottom color="success">
      <span>{{ snackbarMessage }}</span>
      <v-btn
        text
        color="white"
        @click="
          {
            snackbarSuccess = false
            snackbarMessage = ''
          }
        "
        >Close</v-btn
      >
    </v-snackbar>

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
import ApiService from '@/services/api.service'

export default {
  name: 'Register',
  data() {
    return {
      accountInfo: {
        fullname: '',
        username: '',
        password: '',
        email: ''
      },
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      btnLoading: false
    }
  },
  methods: {
    validateForm() {
      // call $validator
      // post to API
      this.btnLoading = true
      ApiService.post('/account/register', {
        ...this.accountInfo
      })
        .then(res => {
          this.btnLoading = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
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
