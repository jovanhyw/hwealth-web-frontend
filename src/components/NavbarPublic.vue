<template>
  <nav>
    <!-- Public Top Navbar -->
    <v-app-bar color="deep-purple accent-4" dark class="px-12">
      <!-- Brand Logo -->
      <v-app-bar-nav-icon class="ml-4">
        <v-avatar>
          <v-img src="/favicon-32x32.png"></v-img>
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
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: 'NavbarPublic',
  data() {
    return {
      tabs: [
        { text: 'Home', route: '/' },
        { text: 'About', route: '/about' },
        { text: 'Register', route: '/register' },
        { text: 'Login', route: '/login' }
      ]
    }
  }
}
</script>

<style></style>
