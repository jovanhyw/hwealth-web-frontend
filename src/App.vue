<template>
  <v-app>
    <NavbarAuthenticated v-if="isAuthenticated" />
    <NavbarPublic v-else />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavbarPublic from '@/components/NavbarPublic'
import NavbarAuthenticated from '@/components/NavbarAuthenticated'

export default {
  name: 'App',
  components: {
    NavbarPublic,
    NavbarAuthenticated
  },
  data: () => ({}),
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
