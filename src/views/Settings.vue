<template>
  <div class="settings">
    <!-- <v-row align="center" justify="center">
	  <v-img src="doctors.svg" max-width="800"></v-img>
    </v-row>-->
    <h1>Settings</h1>
    <v-divider></v-divider>
    <br />
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>General Account Settings</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical center-active>
        <v-tab> <v-icon left>mdi-account</v-icon>User Profile </v-tab>
        <v-tab> <v-icon left>mdi-lock</v-icon>Security </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-form>
              <v-container>
                <h1>Profile</h1>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="username"
                      label="Username"
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="fullname"
                      label="Full Name"
                      outlined
                      :disabled="disableField1"
                      :maxlength="50"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateOfBirth"
                          label="Date of Birth"
                          readonly
                          v-on="on"
                          outlined
                          :disabled="disableField1"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dateOfBirth" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>


                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-btn
                      color="primary"
                      class="mr-2"
                      @click="
                        ;(disableField1 = !disableField1) &
                          (disableButton1 = !disableButton1)
                      "
                      :disabled="disableButton1"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      color="success"
                      @click="updateProfile"
                      :loading="profileLoading"
                      :disabled="disableField1"
                    >
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-form>
              <v-container>
                <h1>Change Password</h1>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="currentPwd"
                      label="Current Password"
                      outlined
                      :disabled="disableField2"
                      :type="'password'"
                      :maxlength="25"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="newPwd"
                      label="New Password"
                      outlined
                      :disabled="disableField2"
                      :type="'password'"
                      :maxlength="25"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="confirmPwd"
                      label="Confirm Password"
                      outlined
                      :disabled="disableField2"
                      :type="'password'"
                      :maxlength="25"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-btn
                      color="primary"
                      class="mr-2"
                      @click="
                        ;(disableField2 = !disableField2) &
                          (disableButton2 = !disableButton2)
                      "
                      :disabled="disableButton2"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      color="success"
                      @click="updatePassword"
                      :loading="changePwdLoading"
                      :disabled="disableField2"
                    >
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-divider></v-divider>
            <br />
            <v-container>
              <h1>Enable 2FA</h1>
              <p class="body-2 font-weight-light">
                You may need to download and install the Google Authenticator
                App first before you can use this functionality.
              </p>
              <div v-if="showQrImage">
                <p> <b>Step 1:</b> Scan this QR code with your mobile app: </p> 
                <img :src="qrImage" >
                <p> <b>Step 2:</b>To confirm the third party app is set up correctly, enter the security code that appears on your phone. </p>
                 <v-row class="mb-n6">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="securityCode"
                      label="Security Code"
                      outlined
                      :maxlength="6"
                    ></v-text-field>
                  </v-col>
              </v-row>
              </div>
              
              <v-row class="mb-n6" v-if="!showQrImage">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="tfapassword"
                      label="Password"
                      outlined
                      :type="'password'"
                      :maxlength="25"
                    ></v-text-field>
                  </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-btn
                    v-if="enableButton"
                    :disabled="twofaButtonSwitch"
                    :loading="twofaButtonLoading"
                    class="mr-2"
                    color="success"
                    @click="enableTwoFa"

                    >enable</v-btn
                  >
                  
                  <v-btn
                    v-show="confirmButtonShow"
                    class="mr-2"
                    color="warning"
                    :loading="confirmLoading"
                    @click="confirmSecurityCode"
                    >confirm</v-btn
                  >

                  <v-btn
                    class="mr-2"
                    color="error"
                    @click="disableTwoFa"
                    >disable</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>

     <v-snackbar v-model="snackbarSuccess" :timeout="3000" bottom color="success">
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

    <v-snackbar v-model="snackbarError" :timeout="3000" bottom color="error">
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
const QRCode = require('qrcode');

export default {
  name: 'settings',
  components: {},
  data: () => ({
    //date: new Date().toISOString().substr(0, 10),
    dateOfBirth: '',
    menu2: false,
    username: '',
    fullname: '',
    email: '',
    currentPwd: '',
    newPwd: '',
    confirmPwd: '',
    dateMenu: false,
    disableField1: true,
    disableButton1: false,
    disableField2: true,
    disableButton2: false,
    enableButton: true,
    profileLoading: false,
    changePwdLoading: false,
    snackbarSuccess: false,
    snackbarError: false,
    snackbarMessage: '',
    tfapassword: '',
    qrImage: '',
    tempSecret: '',
    showQrImage: false,
    twofaButtonSwitch: false,
    twofaButtonLoading: false,
    securityCode: '',
    confirmLoading: false,
    confirmButtonShow: false
  }),
  created() {
    // var data = getUserProfile
    // this.username = data.profile.username
    this.getProfile()
    this.getUsername()
    
    
  },
  methods: {
    getUsername() {
      ApiService.get('/account/')
        .then(res => {
          this.username = res.data.account.username
          this.email = res.data.account.email
        })
        .catch(err => console.log(err))
    },

    getProfile(){
        ApiService.get('/profile')
        .then(res => (this.fullname = res.data.profile.fullname))
        .catch(err => console.log(err))
    },
    updateProfile(){
      const data = {
        "fullname" : this.fullname,
        "dateOfBirth": this.dateOfBirth
      }
      if(data.dateOfBirth == ''){
        delete data.dateOfBirth
      }
      this.profileLoading = true
      ApiService.put('profile/update-profile', data)
      .then(res => {
        console.log(res)
        this.disableField1 = !this.disableField1
        this.disableButton1 = !this.disableButton1
        this.profileLoading = false
        this.snackbarSuccess = true
        this.snackbarMessage = res.data.message
        })
      .catch(err => {
        this.profileLoading = false
        this.btnLoading = false
        this.snackbarError = true
        this.snackbarMessage = err.response.data.message
        })
    },

    updatePassword(){
      if((this.newPwd == this.confirmPwd) && (this.newPwd != '') && (this.confirmPwd != '')){
        this.changePwdLoading = true;
        const data = {
          "currentPassword": this.currentPwd,
          "newPassword": this.newPwd,
          "confirmPassword": this.confirmPwd
        }
        ApiService.put('account/update-password', data)
        .then(res => {
          this.disableField2 = !this.disableField2
          this.disableButton2 = !this.disableButton2
          this.newPwd = ''
          this.currentPwd = ''
          this.confirmPwd = ''
          this.changePwdLoading = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message    
        })
        .catch(err => {
          this.changePwdLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
      } else {
        this.snackbarError = true
        this.snackbarMessage = "Password mismatch. Please try again."
      }

    },
    generateQr(otpAuth){
      var url = otpAuth
      var qrImg = ''
      QRCode.toDataURL(url, (err, dataURL) => {
       qrImg = dataURL;
      })
      return qrImg;
    },
    enableTwoFa(){
      var user = this.$store.getters.getCurrentUser
      console.log(user.twoFactorEnabled)
      // check if password is not empty
      if( this.tfapassword != ''){
        const data = {
          "password": this.tfapassword
        }
        this.twofaButtonLoading = true;
        this.tfapassword = ''
        ApiService.post('two-factor/get-authenticator', data)
        .then(res => {
          this.twofaButtonLoading = false;
          this.twofaButtonSwitch = true;
          this.confirmButtonShow = true;
          console.log(res.data)
          const otpAuth = res.data.secret.otpauth_url
          const qrImg = this.generateQr(otpAuth);
          if (qrImg != ''){
            this.tempSecret = res.data.secret.base32
            this.qrImage = qrImg
            this.showQrImage = true
          } else {
            this.snackbarError = true
            this.snackbarMessage = "QR Image failed to generate."
          }
        })
        .catch(err => {
          this.twofaButtonLoading = false;
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })

      } else {
        this.snackbarError = true
        this.snackbarMessage = "Password field is empty. Please try again."
      }
    },

    confirmSecurityCode(){
      if (this.securityCode != ''){
          const data = {
          "secret": this.tempSecret,
          "token": this.securityCode
        }
        this.securityCode = '';
        this.confirmLoading = true
        console.log(data)
        ApiService.post('two-factor/enable', data)
        .then( res => {
          this.confirmLoading = false
          this.enableButton = false
          this.confirmButtonShow = false
          //show 
          const token = res.data.token
          // update token into local storage
          TokenService.removeToken()
          ApiService.removeHeader()
          TokenService.saveToken(token)
          ApiService.setHeader()

          console.log(res.data.message)
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message  
          this.showQrImage = false
          
        })
        .catch(err => {
          this.confirmLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })

      } else{
        this.snackbarError = true
        this.snackbarMessage = "Security code field is empty. Please try again."
      }

    },
    disableTwoFa(){
      if (this.password != ''){
          const data = {
          "password": this.tfapassword
        }
        this.password = ''
        ApiService.post('/two-factor/disable', data)
        .then(res => {
          console.log('DEBUG:', res)
          if(res.data.error == false){
            // disabled and switch disable to enable button
            this.snackbarSuccess = true
            this.snackbarMessage = res.data.message  
          }

        })
        .catch(err => {
          this.confirmLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
      } else{
        this.snackbarError = true
        this.snackbarMessage = "Password field is empty. Please try again."
      }
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
