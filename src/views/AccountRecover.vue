<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="6" md="5" lg="4">
        <v-card class="elevation-4">
          <v-toolbar color="deep-purple accent-4" dark flat>
            <v-toolbar-title>Recover Account</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="recoverTfa" v-model="validForm">
            <v-card-text>
              <v-text-field
                label="Username"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="[notEmptyRule('Username')]"
                filled
                rounded
                dense
              />
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
              />
              <v-text-field
                label="Recovery Code"
                prepend-icon="mdi-lock-plus"
                type="text"
                v-model="recoveryCode"
                :rules="[notEmptyRule('Recovery code')]"
                filled
                rounded
                dense
              />
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                color="primary"
                type="submit"
                class="mb-2"
                :loading="btnLoading"
                :disabled="!validForm"
                >Recover Account</v-btn
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
import { LOGOUT } from '../store/modules/actions.type'

export default {
  name: 'ResendEmail',
  data() {
    return {
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      btnLoading: false,
      notEmptyRule(property) {
        return v => (v && v.length > 0) || `${property} cannot be empty.`
      },
      validForm: false,
      username: '',
      password: '',
      recoveryCode: ''
    }
  },
  methods: {
    recoverTfa() {
      this.btnLoading = true
      ApiService.post('/two-factor/recover', {
        username: this.username,
        password: this.password,
        recoveryCode: this.recoveryCode
      })
        .then(res => {
          this.btnLoading = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message

          this.$store.dispatch(LOGOUT)
          this.$router.push({ name: 'tfa-disabled' }).catch(() => {})
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
