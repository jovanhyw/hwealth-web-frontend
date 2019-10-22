<template>
  <nav>
    <!-- Public Top Navbar -->
    <v-app-bar app color="deep-purple accent-4" dark class="px-12">
      <!-- Brand Logo -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-nav-icon class="ml-4 mr-4">
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
			<v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
					text
					rounded
          v-on="on"
        >
          Settings 
        </v-btn>

      </template>
      <v-list>
        <v-list-item
          v-for="(dropdownItem, index) in dropdownItems"
          :key="index"				 
        >
          <v-list-item-title>{{ dropdownItem.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>


    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="" fixed> 
        <v-list>
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.route">
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

        </v-list>
    </v-navigation-drawer>


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
        { text: 'Register', route: '/register' }
      ],
			drawer: false,
			item: 1,
			items: [
					{ icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
					{ icon: 'mdi-view-dashboard', text: 'My Projects', route: '/projects' },
					{ icon: 'mdi-view-dashboard', text: 'Team', route: '/team' },
			],
			dropdownItems: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Logout' }
      ],
      offset: true
    }
  }
}
</script>

<style></style>
