<template>
  <div class="chats">
    <v-container fluid>
      <h1 class="headline ma-4">Chats</h1>
      <v-divider></v-divider>

      <div align="center" justify="center">
        <v-progress-circular
          :indeterminate="loading"
          class="mt-12"
          color="primary"
          v-if="loading === true"
        ></v-progress-circular>
      </div>

      <!-- card component -->
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
              <div class="title text-center black--text">
                {{ person.fullname }}
              </div>
              <div class="black--text text-capitalize">{{ person.role }}</div>

              <div align="center" justify="center" class="mt-2">
                <v-btn
                  color="primary"
                  dark
                  route
                  @click="getAllMessages(person._id, person.fullname)"
                >
                  <v-icon small left>mdi-message</v-icon>
                  <span class>Message</span>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- chat component -->
    <template>
      <beautiful-chat
        v-if="participants.length"
        :participants="participants"
        :titleImageUrl="titleImageUrl"
        :onMessageWasSent="onMessageWasSent"
        :messageList="messageList"
        :newMessagesCount="newMessagesCount"
        :isOpen="isChatOpen"
        :close="closeChat"
        :icons="icons"
        :open="openChat"
        :showEmoji="true"
        :showTypingIndicator="showTypingIndicator"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :messageStyling="messageStyling"
        @onType="handleOnType"
        @edit="editMessage"
      />
    </template>
    <!-- end of chat component -->
  </div>
</template>

<script>
import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'
import ApiService from '@/services/api.service'
export default {
  name: 'chats',
  components: {},
  data() {
    return {
      // self data
      professionals: [],
      allConversation: [],
      messages: [],
      loading: true,

      // library data
      icons: {
        open: {
          img: OpenIcon,
          name: 'default'
        },
        close: {
          img: CloseIcon,
          name: 'default'
        },
        file: {
          img: FileIcon,
          name: 'default'
        },
        closeSvg: {
          img: CloseIconSvg,
          name: 'default'
        }
      },
      participants: [], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl:
        'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#6200ea',
          text: '#ffffff'
        },
        launcher: {
          bg: '#6200ea'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  created() {
    this.getProfessionalsProfile()
    this.getAllConversations()
  },
  methods: {
    // self function

    // get professional profile
    getProfessionalsProfile() {
      ApiService.get('/profile/getChatUsers')
        .then(res => {
          this.loading = false
          let result = res.data.professionals
          let temp_professionals = []
          if (result) {
            this.professionals = []
            for (let x in result) {
              let temp_professional = {}
              temp_professional['fullname'] = result[x].fullname
              temp_professional['role'] = result[x].accountId.role
              temp_professional['_id'] = result[x].accountId._id
              temp_professional['username'] = result[x].accountId.username
              temp_professional['avatar'] = '/img/default-pic.png'
              temp_professionals.push(temp_professional)
            }
            this.professionals = temp_professionals
          }
        })
        .catch(() => {
          
        })
    },

    // get all conversations
    getAllConversations() {
      ApiService.get('/conversation')
        .then(res => {
          this.allConversation = res.data.allConversation
        })
        .catch(() => {
        })
    },

    getConversationId(accountId) {
      if (!this.allConversation) return
      let temp_convo = this.allConversation
      for (let x in temp_convo) {
        if (temp_convo[x].members[0].accountId._id == accountId.toString()) {
          return temp_convo[x]._id
        }
      }
    },

    getAllMessages(accountId, fullname) {
      // set participant
      this.participants = [
        {
          id: accountId,
          name: fullname,
          imageUrl: '/img/default-pic.png'
        }
      ]
      let convoId = this.getConversationId(accountId)
      if (convoId === undefined) {
        // has not start a convo yet
        this.messageList = []
        this.openChat()
      } else {
        // reset messageList and open chat
        this.messageList = []
        this.openChat()
        ApiService.get('/conversation/' + convoId)
          .then(res => {
            let temp_messages = res.data.messages
            this.messages = res.data.messages
            for (let x in temp_messages) {
              let messageObj = {}
              messageObj['type'] = 'text'
              if (temp_messages[x].sentBy._id == this.participants[0].id) {
                messageObj['author'] = temp_messages[x].sentBy._id
              } else {
                messageObj['author'] = 'me'
              }
              messageObj['data'] = { text: temp_messages[x].message }
              this.messageList.push(messageObj)
            }
          })
          .catch(() => {
          })
      }
    },

    sendMessageToApi(text) {
      let data = {
        recipient: this.participants[0].id,
        message: text.data.text
      }
      ApiService.post('/message', data)
        .then(() => {
        })
        .catch(() => {
        })
    },

    // library function
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1
        this.onMessageWasSent({
          author: 'support',
          type: 'text',
          data: { text }
        })
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.sendMessageToApi(message)
      this.messageList = [...this.messageList, message]
      // -- populate to the chat
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      //console.log('Emit typing event')
    },
    editMessage(message) {
      const m = this.messageList.find(m => m.id === message.id)
      m.isEdited = true
      m.data.text = message.data.text
    }
  }
}
</script>

<style scoped>
.v-card {
  background-image: url('/img/doc-card.png');
}
</style>
