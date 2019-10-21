<template>
  <nav>
    <!-- Public Top Navbar -->
    <v-app-bar color="deep-purple accent-4" dark class="px-12">
      <!-- Brand Logo -->
      <v-app-bar-nav-icon class="ml-4">
        <v-avatar>
          <v-img src="favicon-32x32.png"></v-img>
        </v-avatar>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase title font-weight-bold">
        <span>HWealth</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        rounded
        v-for="tab in tabs"
        :key="tab.text"
        router
        :to="tab.route"
        class="ma-1"
        >{{ tab.text }}</v-btn
      >
      <v-btn text rounded class="ma-1" @click="logout">Logout</v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import { LOGOUT } from '../store/modules/actions.type'

export default {
  name: 'NavbarAuthenticated',
  data() {
    return {
      tabs: [
        { text: 'Home', route: '/' },
        { text: 'About', route: '/about' },
        { text: 'Settings', route: '/settings' }
      ]
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: 'home' }))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>
