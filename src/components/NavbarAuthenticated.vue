<template>
  <nav>
    <!-- Public Top Navbar -->
    <v-app-bar color="deep-purple accent-4" dark app class="px-2">
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <!-- Brand Logo -->
      <v-app-bar-nav-icon class="mr-4 ml-1">
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
        class="ma-1 hidden-xs-only"
        >{{ tab.text }}</v-btn
      >
      <v-btn text rounded class="ma-1 hidden-xs-only" @click="logout"
        >Logout</v-btn
      >

      <!-- todo: show the drawer on xs screen -->
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Side Navbar -->
    <v-navigation-drawer
      color="deep-purple accent-4"
      dark
      app
      permanent
      :mini-variant.sync="mini"
    >
      <v-list>
        <v-list-item
          v-for="link in sideNavLinks"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
      ],
      drawer: false,
      sideNavLinks: [
        {
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          route: '/dashboard'
        },
        {
          icon: 'mdi-food',
          text: 'Calories Record',
          route: '/calories-record'
        },
        {
          icon: 'mdi-stairs',
          text: 'Steps Record',
          route: '/steps-record'
        },
        {
          icon: 'mdi-chat',
          text: 'Chats',
          route: '/chats'
        }
      ],
      mini: true
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: 'home' }))
        .catch(()=> {})
    }
  }
}
</script>

<style></style>
