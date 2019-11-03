<template>
  <v-container>
    <h1 class="headline ma-4">List of Medical Professionals</h1>
    <v-divider></v-divider>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="person in professionals"
        :key="person._id"
      >
        <v-card elevation="4" class="text-center ma-3">
          <v-responsive class="pt-4">
            <v-avatar size="70" class="grey lighten-2">
              <v-icon style="font-size: 70px">mdi-account-circle</v-icon>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="black--text subtitle-2">{{ person.fullname }}</div>
            <div class="black--text text-capitalize">
              {{ person.accountId.role }}
            </div>

            <div align="center" justify="center" class="mt-2">
              <v-btn color="primary" dark route>
                <v-icon small left>mdi-message</v-icon>
                <span class>Message</span>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from '@/services/api.service'

export default {
  name: 'dashboard',
  components: {},
  data() {
    return {
      professionals: []
    }
  },
  methods: {
    getProfessionals() {
      ApiService.get('/profile/professionals')
        .then(res => {
          this.professionals = res.data.professionals
        })
        .catch(() => {
          console.log('Failed to retrieve profiles.')
        })
    }
  },
  created() {
    this.getProfessionals()
  }
}
</script>

<style scoped>
.v-card {
  background-image: url('/img/doc-card.png');
}
</style>
