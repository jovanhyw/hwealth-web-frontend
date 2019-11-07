<template>
  <v-container>
    <h1 class="headline ma-4">Welcome</h1>
    <v-divider class="mb-4"></v-divider>
    <v-carousel fill-height>
      <v-carousel-item
        v-for="(item, i) in items"
        :src="item.src"
        :key="i"
      ></v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: 'dashboard',
  components: {},
  data() {
    return {
      professionals: [],
      items: [
        {
          src: '/img/carousel1.jpg'
        },
        {
          src: '/img/carousel2.jpg'
        },
        {
          src: '/img/carousel3.jpg'
        },
        {
          src: '/img/carousel4.jpg'
        },
        {
          src: '/img/carousel5.jpg'
        }
      ]
    }
  }
}
</script>
