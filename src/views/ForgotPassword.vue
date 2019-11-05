<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="6" md="5" lg="4">
        <v-card class="elevation-4">
          <v-toolbar color="deep-purple accent-4" dark flat>
            <v-toolbar-title>Forgot Password</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="forgotPass" v-model="validForm">
            <v-card-text>
              <v-text-field
                label="Email"
                prepend-icon="mdi-email"
                type="text"
                v-model="email"
                :rules="[notEmptyRule('Email'), emailRule()]"
              />
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
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      btnLoading: false,
      notEmptyRule(property) {
        return v => (v && v.length > 0) || `${property} cannot be empty.`
      },
      emailRule() {
        return v => /.+@.+\..+/.test(v) || 'E-mail must be valid.'
      },
      validForm: false
    }
  },
  methods: {
    forgotPass() {
      this.btnLoading = true
      ApiService.post('/account/forgot-password', {
        email: this.email
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

<style></style>
