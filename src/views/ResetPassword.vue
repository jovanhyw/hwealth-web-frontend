<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-card class="elevation-4" style="width: 20%;">
            <v-toolbar color="deep-purple accent-4" dark flat>
              <v-toolbar-title>Reset Password</v-toolbar-title>
            </v-toolbar>
            <v-form @submit.prevent="resetPass">
              <v-card-text>
                <v-text-field
                  label="New Password"
                  prepend-icon="mdi-lock"
                  type="password"
                  autocomplete="off"
                  v-model="newPassword"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  dark
                  color="deep-purple accent-4"
                  type="submit"
                  class="mb-2"
                  >Reset Password</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

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
  </v-container>
</template>

<script>
import ApiService from '@/services/api.service'

export default {
  name: 'ResetPassword',
  data() {
    return {
      newPassword: '',
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      btnLoading: false
    }
  },
  methods: {
    resetPass() {
      ApiService.post(
        '/account/reset-password?token=' + this.$route.query.token,
        {
          ...this.newPassword
        }
      )
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

<style></style>
