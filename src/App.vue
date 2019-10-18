<template>
  <v-app>
    <div>
      <v-app-bar color="deep-purple accent-4" dark>
        <v-app-bar-nav-icon class="ml-4">
          <v-avatar>
            <v-img src="favicon-32x32.png"></v-img>
          </v-avatar>
        </v-app-bar-nav-icon>

        <v-toolbar-title>HWealth</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text>Home</v-btn>
        <v-btn text>About</v-btn>
        <v-btn text>Register</v-btn>
        <v-btn text>Login</v-btn>
      </v-app-bar>
    </div>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    //
  })
}
</script>
