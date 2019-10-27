<template>
  <div class="twofaverifcation">
    <v-container
    class="fill-height"
    fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
            cols="12"
            sm="8"
            md="4"
        >
          
          <v-card class="elevation-5">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-spacer></v-spacer>
                <v-toolbar-title><h2>2FA Authentication</h2></v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <div class="title text--primary font-weight-light">
                 Enter the 6 digit verification code from your authenticator app.
                </div>
                <v-text-field
                    v-model="securityCode"
                    label="Security Code"
                    outlined
                    :maxlength="6"
                    class="mt-10"
                ></v-text-field>
                <div class="">
                  <a href="@"><i>I lost access to my Authenticator device</i></a>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                 <v-btn
                      color="primary"
                      class="mr-2"
                      @click="goBack"
                    >
                      <v-icon>mdi-keyboard-backspace</v-icon>
                    </v-btn>
                    <v-btn
                      color="success"
                      @click="proceed"
                      :loading="proceedLoading"
                    >
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
              </v-card-actions>
            </v-card>


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
import { TokenService } from '@/services/storage.service'
export default {
  name: 'TwoFaVerifcation',
  data(){
    return{
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      securityCode: '',
      proceedLoading: false
    }
  },
  methods: {
    goBack(){
      this.$router.push({ name: "login"})
    },
    proceed(){
      if(this.securityCode != ''){
        const data = {
          "token": this.securityCode
        }
        this.securityCode = ''
        this.proceedLoading = true
        ApiService.post('two-factor/authenticate', data)
        .then(res => {
          const token = res.data.token
          TokenService.removeToken()
          ApiService.removeHeader()
          TokenService.saveToken(token)
          ApiService.setHeader()

          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message

          setTimeout(() => this.$router.push({name: '/dashboard'}), 2000)

        })

      } else {
        this.snackbarError = true
        this.snackbarMessage = "Security Code field is empty. Please try again."
      }

      //this.$router.push({ name: "dashboard"})
    }
  }
  
}
</script>

<style lang="sass" scoped>

</style>