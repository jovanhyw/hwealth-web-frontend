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
  </v-container>
</template>

<script>
import ApiService from '@/services/api.service'

export default {
  name: 'ResetPassword',
  data() {
    return {
      newPassword: ''
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
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>
