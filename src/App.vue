<template>
  <v-app>
    <NavbarAuthenticated v-if="isAuthenticated" />
    <NavbarPublic v-else />

    <v-content>
      <router-view></router-view>
    </v-content>

    <Footer v-if="!$route.meta.hideNavigation" />
  </v-app>
</template>

<script>
import NavbarPublic from '@/components/NavbarPublic'
import NavbarAuthenticated from '@/components/NavbarAuthenticated'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    NavbarPublic,
    NavbarAuthenticated,
    Footer
  },
  data: () => ({}),
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style>
.grecaptcha-badge {
  visibility: hidden !important;
}
</style>
