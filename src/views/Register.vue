<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="6" sm="3" lg="6" class="hidden-xs-only">
        <v-img src="/img/doctors.svg"></v-img>
      </v-col>

      <v-col cols="12" xs="12" sm="4" lg="5">
        <v-container fluid>
          <v-row no-gutters>
            <v-col align="center">
              <v-card tile flat>
                <v-card-title
                  class="display-1 font-weight-bold font-weight-black font-italic black--text justify-center"
                  >Register with us!</v-card-title
                >

                <v-divider></v-divider>

                <v-card-text>
                  <v-form @submit.prevent="validateForm" v-model="validForm">
                    <v-text-field
                      label="Full Name"
                      prepend-icon="mdi-account-badge-horizontal"
                      v-model="accountInfo.fullname"
                      :rules="[
                        notEmptyRule('Full name'),
                        fullnameRule(),
                        fullnameLengthRule()
                      ]"
                      filled
                      rounded
                      dense
                    ></v-text-field>

                    <v-text-field
                      label="Username"
                      prepend-icon="mdi-account"
                      v-model="accountInfo.username"
                      :rules="[
                        notEmptyRule('Username'),
                        usernameRule(),
                        usernameLengthRule()
                      ]"
                      filled
                      rounded
                      dense
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      prepend-icon="mdi-lock"
                      type="password"
                      autocomplete="off"
                      v-model="accountInfo.password"
                      :rules="[notEmptyRule('Password'), passwordRule()]"
                      filled
                      rounded
                      dense
                    ></v-text-field>
                    <v-text-field
                      label="Email"
                      prepend-icon="mdi-email"
                      v-model="accountInfo.email"
                      :rules="[notEmptyRule('Email'), emailRule()]"
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
      btnLoading: false,
      notEmptyRule(property) {
        return v => (v && v.length > 0) || `${property} cannot be empty.`
      },
      emailRule() {
        return v => /.+@.+\..+/.test(v) || 'E-mail must be valid.'
      },
      fullnameRule() {
        return v => /^[a-zA-Z ,.'-]+$/.test(v) || 'Invalid full name.'
      },
      fullnameLengthRule() {
        return v =>
          (v && v.length <= 80 && v.length >= 3) || 'Fullname length invalid.'
      },
      usernameRule() {
        return v => /^[a-zA-Z0-9]+\S*$/.test(v) || 'Invalid username.'
      },
      usernameLengthRule() {
        return v =>
          (v && v.length <= 30 && v.length >= 5) || 'Username length invalid.'
      },
      passwordRule() {
        return v =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*<>])(?=.{8,64})(?=.\S*$)/.test(
            v
          ) ||
          'Password must contain 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character, a minimum of 8 characters in total, and no white spaces.'
      },
      validForm: false
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
  /* border-left: 4px solid #6200ea;
  border-right: 4px solid #6200ea; */
  /* border: 4px solid #6200ea; */
  border-radius: 20px;
  background-image: url('/img/cool-background.png');
}
</style>
