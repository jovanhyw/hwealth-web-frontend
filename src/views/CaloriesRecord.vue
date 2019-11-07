<template>
  <div class="calories-record">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col>
          <h1 class="headline ma-4">Calories Record</h1>
        </v-col>
        <v-spacer></v-spacer>
        <v-col align="end">
          <v-btn dark color="primary" @click="newRecordDialog = true"
            >Add New Record</v-btn
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <br />
      <div align="center" justify="center">
        <v-progress-circular
          :indeterminate="loading"
          class="mt-12"
          color="primary"
          v-if="loading === true"
        ></v-progress-circular>
      </div>

      <!-- -->
      <template>
        <div align="center" justify="center">
          <div v-if="records != null">
            <v-card
              max-width="70%"
              class="mb-5 wow"
              v-for="(record, index) in records"
              :key="index"
            >
              <v-container>
                <v-row cols="10">
                  <v-col cols="4">
                    <v-card color="#1F7087" dark>
                      <v-card-title class="headline">
                        Date
                        <v-icon class="ml-2">mdi-calendar</v-icon>
                      </v-card-title>
                      <v-card-subtitle>
                        {{
                          new Date(record.dateRecorded).getDate() +
                            '-' +
                            (new Date(record.dateRecorded).getMonth() + 1) +
                            '-' +
                            new Date(record.dateRecorded).getFullYear()
                        }}
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card color="#385F73" dark>
                      <v-card-title class="headline">
                        Meal Type
                        <v-icon class="ml-2">mdi-food</v-icon>
                      </v-card-title>

                      <v-card-subtitle>{{ record.mealType }}</v-card-subtitle>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card color="#922175" dark>
                      <v-card-title class="headline">
                        Total Calories
                        <v-icon class="ml-2">mdi-hospital-box</v-icon>
                      </v-card-title>

                      <v-card-subtitle>{{
                        record.totalCalories
                      }}</v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-data-iterator
                  :items="record.foodEaten"
                  :items-per-page.sync="itemsPerPage"
                  :footer-props="{ itemsPerPageOptions }"
                >
                  <template v-slot:default="props">
                    <v-row>
                      <v-col
                        v-for="(item, itemIndex) in props.items"
                        :key="itemIndex"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="3"
                      >
                        <v-card>
                          <v-card-title class="subheading font-weight-bold">
                            {{ item.foodName }}
                          </v-card-title>

                          <v-divider></v-divider>

                          <v-list dense>
                            <v-list-item>
                              <v-list-item-content
                                >Calories:</v-list-item-content
                              >
                              <v-list-item-content class="align-end">
                                {{ item.calories }}
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-col>
                    </v-row>
                    <br />
                    <v-row class="mt-n6">
                      <v-col cols="12">
                        <v-btn
                          color="error"
                          class="mr-2 float-right"
                          @click="deleteCaloriesRecord(record._id)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn
                          color="primary"
                          class="mr-2 float-right"
                          @click="updateDialogView(index)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-container>
            </v-card>
          </div>
        </div>

        <v-snackbar
          v-model="snackbarSuccess"
          :timeout="3000"
          bottom
          color="success"
        >
          <span>{{ snackbarMessage }}</span>
          <v-btn
            text
            color="white"
            @click="
              {
                snackbarSuccess = false
                snackbarMessage = ''
              }
            "
            >Close</v-btn
          >
        </v-snackbar>

        <v-snackbar
          v-model="snackbarError"
          :timeout="3000"
          bottom
          color="error"
        >
          <span>{{ snackbarMessage }}</span>
          <v-btn
            text
            color="white"
            @click="
              {
                snackbarError = false
                snackbarMessage = ''
              }
            "
            >Close</v-btn
          >
        </v-snackbar>
      </template>
      <!-- -->

      <br />
      <!-- New Record dialog -->
      <v-dialog v-model="newRecordDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">New Record</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-overflow-btn
                    v-model="newRecordMealType"
                    :items="meal_type"
                    label="Meal Type"
                  ></v-overflow-btn>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-btn class="mt-4 float-right error" @click="removeMealRow">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn
                    class="mt-4 mr-4 float-right primary"
                    @click="addMealRow"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-for="i in counter" :key="i">
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="newRecordFoodEaten[i - 1].foodName"
                    label="Food"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    type="number"
                    v-model.number="newRecordFoodEaten[i - 1].calories"
                    label="Calories"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="createCaloriesRecord"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Update dialog -->
      <v-dialog v-model="updateDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Update Record</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <div v-if="tempUpdateRecords != null">
                <v-row
                  v-for="(tempUpdateRecord, index) in tempUpdateRecords[vector]
                    .foodEaten"
                  :key="index"
                >
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="tempUpdateRecord.foodName"
                      label="Food"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="number"
                      v-model.number="tempUpdateRecord.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="updateCaloriesRecord(vector)"
              >Update</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import ApiService from '@/services/api.service'
export default {
  data: () => ({
    counter: 1,
    meal_type: ['Breakfast', 'Lunch', 'Dinner', 'Supper'],
    itemsPerPageOptions: [4, 8, 12],
    itemsPerPage: 4,
    loading: true,
    tempUpdateRecords: null,
    records: null,
    // my data
    updateDialog: false,
    newRecordDialog: false,
    snackbarSuccess: false,
    snackbarError: false,
    snackbarMessage: '',
    newRecordMealType: '',
    newRecordFoodEaten: [
      {
        foodName: '',
        calories: 0
      }
    ],
    updateRecordMealType: '',
    upodateRecordFoodEaten: [],
    vector: 0
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Record' : 'Edit Record'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.getCaloriesRecord()
  },
  methods: {
    resetRecord() {
      this.counter = 1
      this.newRecordFoodEaten = [
        {
          foodName: '',
          calories: 0
        }
      ]
    },

    addMealRow() {
      this.counter = this.counter + 1
      // push to array
      this.newRecordFoodEaten.push({
        foodName: '',
        calories: 0
      })
    },
    removeMealRow() {
      if (this.counter > 1) {
        this.counter = this.counter - 1
        // remove array
        this.newRecordFoodEaten.pop()
      }
    },

    getCaloriesRecord() {
      ApiService.get('/calories-record')
        .then(res => {
          this.loading = false
          if (res.data.records.length > 0) {
            this.records = res.data.records
          } else {
            this.records = null
            this.snackbarSuccess = true
            this.snackbarMessage = res.data.message
          }
        })
        .catch(err => {
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    createCaloriesRecord() {
      // validation here not done yet

      if (this.newRecordMealType == '') {
        this.snackbarError = true
        this.snackbarMessage = 'Meal type must not be empty.'
        return
      }

      for (var x in this.newRecordFoodEaten) {
        if (this.newRecordFoodEaten[x].foodName == '') {
          this.snackbarError = true
          this.snackbarMessage = 'Food name must not be empty.'
          return
        }
        if (typeof this.newRecordFoodEaten[x].calories != 'number') {
          this.snackbarError = true
          this.snackbarMessage = 'Food calories must be a number type.'
          return
        }
        // check positive
        if (Math.sign(this.newRecordFoodEaten[x].calories) == -1) {
          this.snackbarError = true
          this.snackbarMessage = 'Food calories must not be negative.'
          return
        }
        if (
          !Number.isInteger(this.newRecordFoodEaten[x].calories) ||
          this.newRecordFoodEaten[x].calories == ''
        ) {
          this.snackbarError = true
          this.snackbarMessage =
            'Food calories must not be empty and it must be a number.'
          return
        }
      }
      const d = new Date()
      const data = {
        dateRecorded:
          d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getUTCDate(),
        mealType: this.newRecordMealType,
        foodEaten: this.newRecordFoodEaten
      }
      ApiService.post('calories-record', data)
        .then(res => {
          this.resetRecord()
          this.getCaloriesRecord()
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.newRecordDialog = false
        })
        .catch(err => {
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    updateCaloriesRecord(id) {
      // check if values not empty
      // check if calories is not digit
      console.log(this.tempUpdateRecords[id])
      for (var x in this.tempUpdateRecords[id].foodEaten) {
        console.log(this.tempUpdateRecords[id].foodEaten[x].foodName)
        if (this.tempUpdateRecords[id].foodEaten[x].foodName == '') {
          this.snackbarError = true
          this.snackbarMessage = 'Food name must not be empty.'
          return
        }
        console.log(this.tempUpdateRecords[id].foodEaten[x].calories)
        if (
          typeof this.tempUpdateRecords[id].foodEaten[x].calories != 'number'
        ) {
          this.snackbarError = true
          this.snackbarMessage = 'Food calories must be a number type.'
          return
        }
        // check positive
        if (Math.sign(this.tempUpdateRecords[id].foodEaten[x].calories) == -1) {
          this.snackbarError = true
          this.snackbarMessage = 'Food calories must not be negative.'
          return
        }
        if (
          !Number.isInteger(this.tempUpdateRecords[id].foodEaten[x].calories) ||
          this.tempUpdateRecords[id].foodEaten[x].calories == ''
        ) {
          this.snackbarError = true
          this.snackbarMessage =
            'Food calories must not be empty and it must be a number.'
          return
        }
      }
      const url = 'calories-record/' + this.tempUpdateRecords[id]._id
      const data = {
        foodEaten: this.tempUpdateRecords[id].foodEaten
      }
      ApiService.put(url, data)
        .then(res => {
          this.getCaloriesRecord()
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.updateDialog = false
        })
        .catch(err => {
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    deleteCaloriesRecord(id) {
      const url = 'calories-record/' + id
      ApiService.delete(url)
        .then(res => {
          this.getCaloriesRecord()
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.newRecordDialog = false
        })
        .catch(err => {
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },

    updateDialogView(id) {
      this.tempUpdateRecords = this.records
      this.vector = id
      this.updateDialog = true
    },

    // get all calories record

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.desserts.splice(index, 1)
    },

    close() {
      this.newRecordDialog = false
      this.updateDialog = false
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
.float-right {
  float: right;
}
.wow {
  border-left: 4px solid #6200ea;
  border-radius: 20px;
}
</style>
