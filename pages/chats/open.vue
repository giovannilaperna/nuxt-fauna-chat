<template>
    <section class="section container">
        {{ chats.length }}
        <div v-for="chat in chats" :key="chat.ref" :value="chat" class="block">
            {{ chat.ref }} / {{ chat.status }}
        </div>
    </section>
</template>

<script>
import remove from 'lodash.remove'
export default {
    async asyncData({ app, $axios }) {
        const { data: chats } = await $axios.get(`/ws/chats/open`)
        return { chats }
    },
    mounted() {
        this.socket = this.$nuxtSocket({ name: "chats" }) // withCredentials: true
        this.socket.on('chats', ({ action, data }) => {
            if (action === 'add') {
                this.chats.unshift(data)
            } else if ( action === 'remove') {
                remove(this.chats, (chat) => {
                    return chat.ref === data.ref
                })
                this.chats = [ ...this.chats ]
            }
        })
    }
}
</script>