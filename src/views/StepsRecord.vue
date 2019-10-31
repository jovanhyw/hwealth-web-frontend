<template>
   <div class="step-record">
     <v-container
     fluid
     >
    <h1>Steps Record</h1>
    <v-divider></v-divider>
    <br />

    <v-data-table
    :headers="headers"
    :items="records"
    sort-by="calories"
    class="elevation-1 v-table"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Record</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="8">
                    <v-text-field v-model="editedItem.totalSteps" label="Total Steps"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>

     </v-container>

    <v-snackbar v-model="snackbarSuccess" :timeout="3000" bottom color="success">
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

      <v-snackbar v-model="snackbarError" :timeout="3000" bottom color="error">
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

   </div>
</template>

<script>
import ApiService from '@/services/api.service'
export default {
  data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Date',
          align: 'left',
          value: 'dateRecorded',
        },
        { text: 'Total Steps', align: 'center', value: 'totalSteps' },
        { text: 'Actions', align:'center', value: 'action', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        totalSteps: '0'
      },
      defaultItem: {
        totalSteps: '0'
      },
      
      records: [],
      //my data
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
    }),

  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Steps Record' : 'Edit Steps Record'
      }
    },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  created () {
    this.getStepsRecord()

  },
  methods: {
      // get steps record api
      getStepsRecord(){
        ApiService.get('/steps-record')
        .then(res => {
          this.records = res.data.records
          this.records.forEach(record => {
            record.dateRecorded = new Date(record.dateRecorded).getDate() + '-' + (new Date(record.dateRecorded).getMonth() + 1) + '-' + new Date(record.dateRecorded).getFullYear()
          })
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message  
        })
        .catch(err => {
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
      },

      createStepsRecord(totalSteps){
        const steps = totalSteps.trim()
        if (steps == ''){
          this.snackbarError = true
          this.snackbarMessage = "Total steps must not be empty."
          return
        }
        if (isNaN(steps)){
          this.snackbarError = true
          this.snackbarMessage = "Total steps must be a number."
          return
        }
        // validation
        const d = new Date()
        const data = {
          "dateRecorded": d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getUTCDate(),
          "totalSteps": steps
        }
        ApiService.post('steps-record', data)
        .then(res => {
          this.getStepsRecord()
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          
        })
        .catch(err => {
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
      },

      updateStepsRecord(id, totalSteps){
        const steps = totalSteps.trim()
        if (steps == ''){
          this.snackbarError = true
          this.snackbarMessage = "Total steps must not be empty."
          return
        }
        if (isNaN(steps)){
          this.snackbarError = true
          this.snackbarMessage = "Total steps must be a number."
          return
        }
        const d = new Date()
        const url = 'steps-record/' + id
        const data = {
          "dateRecorded": d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getUTCDate(),
          "totalSteps": steps
        }
        ApiService.put(url, data)
        .then(res => {
          this.getStepsRecord()
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
        })
        .catch(err => {
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
      },

      deleteStepsRecord(id){
        const url = 'steps-record/' + id 
        ApiService.delete(url)
        .then(res => {
          this.getStepsRecord()
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
        })
        .catch(err => {
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
      },

      editItem (item) {
        this.editedIndex = this.records.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        var c = confirm('Are you sure you want to delete this record?')
        if(c == true){
          this.deleteStepsRecord(item._id)
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          // update
          const id = this.records[this.editedIndex]._id
          const stepsVal = this.editedItem.totalSteps
          this.updateStepsRecord(id, stepsVal)
          console.log(id)

        } else {
          // create
          this.createStepsRecord(this.editedItem.totalSteps)
        }
        this.close()
      },
  }
}
</script>

<style>

th {
  font-size: 30px !important;
}

td {
  font-size: 20px !important;
}
</style>