<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="6" md="5" lg="4">
        <v-card class="elevation-4">
          <v-toolbar color="deep-purple accent-4" dark flat>
            <v-toolbar-title
              >Two factor authentication disabled</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text>
            <div class="black--text">
              Two Factor Authentication has been disabled from your account.
              Please login again.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TfaDisabled',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style></style>
