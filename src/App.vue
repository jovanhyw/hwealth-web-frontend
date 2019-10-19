<template>
  <v-app>
    <NavbarPublic />

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavbarPublic from '@/components/NavbarPublic'
export default {
  name: 'App',
  components: {
    NavbarPublic
  },
  data: () => ({})
}
</script>
