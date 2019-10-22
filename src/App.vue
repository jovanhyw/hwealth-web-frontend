<template>
  <v-app>
    <NavbarPrivate />

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavbarPrivate from '@/components/NavbarPrivate'
export default {
  name: 'App',
  components: {
    NavbarPrivate
  },
  data: () => ({})
}
</script>
