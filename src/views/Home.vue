<template>
  <div class="home">
    <section>
      <v-parallax dark src="/img/home.svg" height="800">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-bold mb-12">
              Want to receive advices from medical professionals?
            </h1>
            <v-btn class="subheading" color="primary" router to="/register"
              >Join us today!</v-btn
            >
          </v-col>
        </v-row>
      </v-parallax>
    </section>

    <section style="background-color: #f7f7f7;">
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col class="text-center mb-12" cols="12">
            <h1 class="display-1 font-weight-bold my-8 text-uppercase">
              Features
            </h1>
            <span class="subtitle-2">Here's what you can do with HWealth!</span>
          </v-col>

          <v-col class="text-center" cols="12" lg="3">
            <div align="center" justify="center" class="setheight">
              <v-img src="/img/calories.svg" max-width="300px"></v-img>
            </div>
            <h3 class="subtitle-1 font-weight-bold mt-12">
              Track your calories
            </h3>
            <span class="subtitle-2">
              Record what you eat everyday into the application to track your
              daily calorie intake!
            </span>
          </v-col>

          <v-col class="text-center" cols="12" lg="3">
            <div align="center" justify="center" class="setheight">
              <v-img src="/img/steps.svg" max-width="300px"></v-img>
            </div>
            <h3 class="subtitle-1 font-weight-bold mt-12">Track your steps</h3>
            <span class="subtitle-2">
              Record the amount of steps you take everyday into the application
              to track your steps!
            </span>
          </v-col>

          <v-col class="text-center" cols="12" lg="3">
            <div align="center" justify="center" class="setheight">
              <v-img src="/img/chat.svg" max-width="300px"></v-img>
            </div>
            <h3 class="subtitle-1 font-weight-bold mt-12">
              Chat with medical professionals
            </h3>
            <span class="subtitle-2">
              Browse through a list of certified medical professionals and seek
              their advice on your medical queries!
            </span>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {}
}
</script>

<style scoped>
.setheight {
  height: 280px;
}
</style>
