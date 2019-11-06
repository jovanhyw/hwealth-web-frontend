<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="6" md="5" lg="4">
        <v-card class="elevation-4">
          <v-toolbar color="deep-purple accent-4" dark flat>
            <v-toolbar-title>Reset Password</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="resetPass" v-model="validForm">
            <v-card-text>
              <v-text-field
                label="New Password"
                prepend-icon="mdi-lock"
                type="password"
                autocomplete="off"
                v-model="newPassword"
                :rules="[notEmptyRule('New password'), passwordRule()]"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                color="primary"
                type="submit"
                class="mb-2"
                :loading="btnLoading"
                :disabled="!validForm"
                >Reset Password</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
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
      btnLoading: false,
      notEmptyRule(property) {
        return v => (v && v.length > 0) || `${property} cannot be empty.`
      },
      validForm: false,
      passwordRule() {
        return v =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*<>])(?=.{8,64})(?=.\S*$)/.test(
            v
          ) ||
          'Password must contain 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character, a minimum of 8 characters in total, and no white spaces.'
      }
    }
  },
  methods: {
    resetPass() {
      this.btnLoading = true
      ApiService.post(
        '/account/reset-password?token=' + this.$route.query.token,
        {
          newPassword: this.newPassword
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
