<template>
    <ChatLauncher
        :participants="participants"
        :onMessageWasSent="onMessageWasSent"
        :messageList="messageList"
        :newMessagesCount="newMessagesCount"
        :isOpen="isChatOpen"
        :close="closeChat"
        :open="openChat"
        :showEmoji="true"
        :sendEmojisDirectly="false"
        :showFile="true"
        :deletionConfirmation="true"
        :showTypingIndicator="showTypingIndicator"
        :showLauncher="true"
        :showCloseButton="true"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :disableUserListToggle="false"
        :messageStyling="messageStyling"
        @onType="handleOnType"
    />
</template>

<script>
export default {
    data() {
        return {
            participants: [
                {
                    id: 'user1',
                    name: 'Matteo',
                    imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
                },
                {
                    id: 'user2',
                    name: 'Support',
                    imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
                }
            ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
            messageList: [],
            newMessagesCount: 0,
            isChatOpen: false,
            colors: {
                header: {
                    bg: '#7957d5',
                    text: '#ffffff'
                },
                    launcher: {
                    bg: '#7957d5'
                },
                    messageList: {
                    bg: '#ffffff'
                },
                sentMessage: {
                    bg: '#7957d5',
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
            alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
            messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
        }
    },
    methods: {
        sendMessage (text) {
            if (text.length > 0) {
                this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
                this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
            }
        },
        onMessageWasSent (message) {
            // called when the user sends a message
            this.messageList = [ ...this.messageList, message ]
        },
        openChat () {
            // called when the user clicks on the fab button to open the chat
            this.isChatOpen = true
            this.messageList = []
            this.newMessagesCount = 0
        },
        closeChat () {
            // called when the user clicks on the botton to close the chat
            this.isChatOpen = false
            this.messageList = []
            this.newMessagesCount = 0
        },
        handleScrollToTop () {
            // called when the user scrolls message list to top
            // leverage pagination for loading another page of messages
        },
        handleOnType () {
            console.log('Emit typing event')
        }
    }
}
</script>