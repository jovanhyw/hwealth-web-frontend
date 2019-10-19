<template>
  <div class="register">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img src="/img/doctors.svg"></v-img>
        </v-col>

        <v-col cols="6">
          <v-container>
            <v-row>
              <v-col>
                <v-row justify="center">
                  <span
                    class="display-1 font-weight-bold font-weight-black font-italic blue-grey--text"
                    >Register with us!</span
                  >
                </v-row>
                <v-row>
                  <v-form @submit.prevent="validateForm">
                    <v-text-field
                      label="Full Name"
                      prepend-icon="mdi-account-badge-horizontal"
                      v-model="accountInfo.fullname"
                    ></v-text-field>
                    <v-text-field
                      label="Username"
                      prepend-icon="mdi-account"
                      v-model="accountInfo.username"
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      prepend-icon="mdi-lock"
                      type="password"
                      autocomplete="off"
                      v-model="accountInfo.password"
                    ></v-text-field>
                    <v-text-field
                      label="Email"
                      prepend-icon="mdi-email"
                      v-model="accountInfo.email"
                    ></v-text-field>
                    <v-btn block dark color="deep-purple accent-4" type="submit"
                      >Register</v-btn
                    >
                  </v-form>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      accountInfo: {
        fullname: '',
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    validateForm() {
      // call $validator
      // post to API
      console.log(JSON.stringify(this.accountInfo))
    }
  }
}
</script>

<style></style>
