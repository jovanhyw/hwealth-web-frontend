<template>
  <div class="login">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img src="/img/doctors.svg"></v-img>
        </v-col>

        <v-col cols="5" offset="1">
          <v-form @submit.prevent="validateLogin">
          <v-row>
            <v-col>
              <v-text-field
              label="Username" solo
              v-model="account.username"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
              v-model="account.password"
              label="Password" solo
              type="password"
              ></v-text-field>   
              <a v-bind:href="url"> <p class="mt-n5"><i>Forget password?</i></p> </a>
            </v-col>
            <v-col cols="1">
            <v-btn large type="submit" :loading="btnLoading">Log in</v-btn>
            </v-col>
          </v-row>
          </v-form>
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
   
  </div>
</template>


<script>
import ApiService from '@/services/api.service'
export default {
  name:'Login',
  data(){
    return {
      account: {
        username: '',
        password: ''
      },
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      btnLoading: false,
      url: "#"
    }
  },
  methods:{
      validateLogin() {
      // call $validator
      // post to API
      this.btnLoading = true
      ApiService.post('/auth/login', {
        ...this.account
      })
        .then(res => {
          this.btnLoading = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data
          console.log("hit")
          console.log(res)
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
<style>
</style>
