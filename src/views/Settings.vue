<template>
  <div class="settings">
    <!-- <v-row align="center" justify="center">
	  <v-img src="doctors.svg" max-width="800"></v-img>
    </v-row>-->
    <h1>Settings</h1>
    <v-divider></v-divider>
    <br />
    <h1>{{ getUserProfile.profile.fullname }}</h1>
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
                      v-model="fullname"
                      label="Full Name"
                      outlined
                      :disabled="disableField1"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      outlined
                      :disabled="disableField1"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Phone number"
                      outlined
                      :disabled="disableField1"
                      >12312312</v-text-field
                    >
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="dob"
                      label="Date of Birth"
                      outlined
                      :disabled="disableField1"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="mt-n6">
                  <v-col cols="12" sm="6">
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Date of Birth"
                          :disabled="disableField1"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="dateMenu = false"
                      ></v-date-picker>
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
                      @click="
                        ;(disableField1 = !disableField1) &
                          (disableButton1 = !disableButton1)
                      "
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
                      @click="
                        ;(disableField2 = !disableField2) &
                          (disableButton2 = !disableButton2)
                      "
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

              <v-row>
                <v-col cols="12" sm="6">
                  <v-btn
                    v-if="twofaButton"
                    color="success"
                    @click="twofaButton = !twofaButton"
                    >enable</v-btn
                  >
                  <v-btn
                    v-else
                    color="warning"
                    @click="twofaButton = !twofaButton"
                    >disable</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import ApiService from '@/services/api.service'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'settings',
  components: {},
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    username: '',
    fullname: '',
    email: '',

    dob: '',
    currentPwd: '',
    newPwd: '',
    confirmPwd: '',
    dateMenu: false,
    disableField1: true,
    disableButton1: false,
    disableField2: true,
    disableButton2: false,
    twofaButton: true
  }),
  computed: mapGetters(['getUserProfile']),
  created() {
    // var data = getUserProfile
    // this.username = data.profile.username
    this.getProfile()
  },
  methods: {
    ...mapActions(['fetchUserProfile']),
    getProfile() {
      ApiService.get('/profile')
        .then(res => (this.fullname = res.data.profile.fullname))
        .catch(err => console.log(err))
    }
  }
}
</script>
