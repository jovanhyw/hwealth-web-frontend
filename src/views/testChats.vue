<template>
  <div class="testchats">
    <span>
      L11
    </span>
    <template>
      <div>
        <Chat
          :participants="participants"
          :myself="myself"
          :messages="messages"
          :onType="onType"
          :onMessageSubmit="onMessageSubmit"
          :chatTitle="chatTitle"
          :placeholder="placeholder"
          :colors="colors"
          :borderStyle="borderStyle"
          :hideCloseButton="hideCloseButton"
          :closeButtonIconSize="closeButtonIconSize"
          :onClose="onClose"
          :submitIconSize="submitIconSize"
          :asyncMode="asyncMode"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { Chat } from 'vue-quick-chat'
export default {
  name: 'testchats',
  components: {
    Chat
  },
  data() {
    return {
      event: '',
      visible: true,
      participants: [
        {
          name: 'Arnaldo',
          id: 1
        },
        {
          name: 'José',
          id: 2
        }
      ],
      myself: {
        name: 'Matheus S.',
        id: 3
      },
      messages: [
        {
          content: 'received messages',
          myself: false,
          participantId: 1,
          timestamp: {
            year: 2019,
            month: 3,
            day: 5,
            hour: 20,
            minute: 10,
            second: 3,
            millisecond: 123
          }
        },
        {
          content: 'sent messages',
          myself: true,
          participantId: 3,
          timestamp: {
            year: 2019,
            month: 4,
            day: 5,
            hour: 19,
            minute: 10,
            second: 3,
            millisecond: 123
          }
        },
        {
          content: 'other received messages',
          myself: false,
          participantId: 2,
          timestamp: {
            year: 2019,
            month: 5,
            day: 5,
            hour: 10,
            minute: 10,
            second: 3,
            millisecond: 123
          }
        }
      ],
      chatTitle: 'My chat title',
      placeholder: 'send your message',
      colors: {
        header: {
          bg: '#d30303',
          text: '#fff'
        },
        message: {
          myself: {
            bg: '#fff',
            text: '#bdb8b8'
          },
          others: {
            bg: '#fb4141',
            text: '#fff'
          },
          messagesDisplay: {
            bg: '#f7f3f3'
          }
        },
        submitIcon: '#b91010'
      },
      borderStyle: {
        topLeft: '10px',
        topRight: '10px',
        bottomLeft: '10px',
        bottomRight: '10px'
      },
      hideCloseButton: false,
      submitIconSize: '20px',
      closeButtonIconSize: '20px',
      asyncMode: false
    }
  },
  methods: {
    onType: function(event) {
      //here you can set any behavior
      console.log(event)
    },
    onMessageSubmit: function(message) {
      /*
       * example simulating an upload callback.
       * It's important to notice that even when your message wasn't send
       * yet to the server you have to add the message into the array
       */
      this.messages.push(message)

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      setTimeout(() => {
        message.uploaded = true
      }, 2000)
    },
    onClose() {
      this.visible = false
    }
  }
}
</script>
