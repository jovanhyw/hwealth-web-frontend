<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col>
        <h1 class="headline ma-4">Steps Record</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col align="end">
        <v-btn dark color="primary" @click="addStepDialog = true"
          >Add New Record</v-btn
        >
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <div align="center" justify="center">
      <div
        v-if="allStepsRecords.length == 0"
        class="title grey--text text--lighten-1 mt-12"
      >
        It looks empty here. Click on the 'Add New Record' button to start
        tracking your steps!
      </div>
      <v-card
        max-width="50%"
        class="my-2 wow"
        v-for="stepRecord in allStepsRecords"
        :key="stepRecord._id"
      >
        <v-row class="pa-1" align="center" justify="center">
          <v-col cols="12" sm="6" md="2" lg="2">
            <div class="caption grey--text">Date</div>
            <div>{{ stepRecord.dateRecorded | prettyDOB }}</div>
          </v-col>
          <v-col cols="12" sm="6" md="2" lg="2">
            <div class="caption grey--text">Total Steps</div>
            <div>{{ stepRecord.totalSteps }}</div>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="3">
            <v-btn
              class="ma-1"
              color="primary"
              @click="openEditDialog(stepRecord)"
              >edit</v-btn
            >
            <v-btn
              class="ma-1"
              color="error"
              @click="openDeleteDialog(stepRecord._id)"
              >Delete</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </div>

    <!-- Dialog for Add -->
    <v-dialog v-model="addStepDialog" persistent max-width="500">
      <v-card class="elevation-5">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Add new step record</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div align="center" justify="center" class="mt-4">
            <v-form @submit.prevent="addStepsRecord">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateRecorded"
                    label="Please select a date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateRecorded"
                  :show-current="new Date().toISOString().substr(0, 10)"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                label="Total Steps taken"
                prepend-icon="mdi-stairs"
                type="number"
                v-model="totalSteps"
              ></v-text-field>

              <v-row align="center" justify="center">
                <v-btn color="error" class="ma-1" @click="addStepDialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="success"
                  class="ma-1"
                  type="submit"
                  :loading="submitBtnLoading"
                  >Submit</v-btn
                >
              </v-row>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog for Edit -->
    <v-dialog
      v-if="editDialogData !== null"
      v-model="editDialog"
      persistent
      max-width="500"
    >
      <v-card class="elevation-5">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Edit record</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div align="center" justify="center" class="mt-4">
            <v-form @submit.prevent="editStepsRecord">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="editDialogData.dateRecorded"
                    label="Please select a date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editDialogData.dateRecorded"
                  :show-current="new Date().toISOString().substr(0, 10)"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                label="Total Steps taken"
                prepend-icon="mdi-stairs"
                type="number"
                v-model="editDialogData.totalSteps"
              ></v-text-field>

              <v-row align="center" justify="center">
                <v-btn color="error" class="ma-1" @click="editDialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="success"
                  class="ma-1"
                  type="submit"
                  :loading="submitBtnLoading"
                  >Submit</v-btn
                >
              </v-row>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog for Delete -->
    <v-dialog
      v-if="deleteDialogData !== null"
      v-model="deleteDialog"
      persistent
      max-width="500"
    >
      <v-card class="elevation-5">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Delete record</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div align="center" justify="center" class="mt-4">
            <v-form @submit.prevent="deleteStepsRecord">
              <div class="title black--text mb-3">
                Are you sure you want to delete this record?
              </div>

              <v-row align="center" justify="center">
                <v-btn color="error" class="ma-1" @click="deleteDialog = false"
                  >No</v-btn
                >
                <v-btn
                  color="success"
                  class="ma-1"
                  type="submit"
                  :loading="submitBtnLoading"
                  >Yes</v-btn
                >
              </v-row>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbarSuccess" :timeout="0" bottom color="success">
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

    <v-snackbar v-model="snackbarError" :timeout="0" bottom color="error">
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
  </v-container>
</template>

<script>
import ApiService from '@/services/api.service'

export default {
  name: 'StepsRecord',
  components: {},
  data() {
    return {
      allStepsRecords: [],
      addStepDialog: false,
      dateRecorded: new Date().toISOString().substr(0, 10),
      totalSteps: null,
      menu: false,
      submitBtnLoading: false,
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      editDialog: false,
      editDialogData: null,
      deleteDialog: false,
      deleteDialogData: null
    }
  },
  methods: {
    getStepsRecord() {
      this.loading = true
      ApiService.get('/steps-record')
        .then(res => {
          this.allStepsRecords = res.data.records
          this.loading = false
        })
        .catch(() => {
          console.log('Failed to retrieve steps record.')
          this.loading = false
        })
    },
    addStepsRecord() {
      this.submitBtnLoading = true

      // by right the steps shld b in number
      // but right now it's a string json.
      ApiService.post('/steps-record', {
        dateRecorded: this.dateRecorded,
        totalSteps: this.totalSteps
      })
        .then(res => {
          this.submitBtnLoading = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.addStepDialog = false

          // reset variables
          this.dateRecorded = new Date().toISOString().substr(0, 10)
          this.totalSteps = null

          this.getStepsRecord()
        })
        .catch(err => {
          this.submitBtnLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    openEditDialog(record) {
      // set the vmodel data
      this.editDialogData = record
      // because mongodb return us an ugly date that vuetify dont understand
      this.editDialogData.dateRecorded = this.$options.filters.formatDOB(
        this.editDialogData.dateRecorded
      )
      // open the dialog
      this.editDialog = true
    },
    editStepsRecord() {
      this.submitBtnLoading = true
      ApiService.put('/steps-record/' + this.editDialogData._id, {
        dateRecorded: this.editDialogData.dateRecorded,
        totalSteps: this.editDialogData.totalSteps
      })
        .then(res => {
          // stop the loading on btn
          this.submitBtnLoading = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.editDialog = false
          this.editDialogData = null

          this.getStepsRecord()
        })
        .catch(err => {
          this.submitBtnLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    openDeleteDialog(recordId) {
      this.deleteDialogData = recordId
      this.deleteDialog = true
    },
    deleteStepsRecord() {
      this.submitBtnLoading = true
      ApiService.delete('/steps-record/' + this.deleteDialogData)
        .then(res => {
          this.submitBtnLoading = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.deleteDialog = false
          this.deleteDialogData = null

          this.getStepsRecord()
        })
        .catch(err => {
          this.submitBtnLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    }
  },
  created() {
    this.getStepsRecord()
  }
}
</script>

<style scoped>
.wow {
  border-left: 4px solid #6200ea;
  border-radius: 20px;
}
</style>
