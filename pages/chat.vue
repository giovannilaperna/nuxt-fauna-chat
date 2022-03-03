<template>
    <section class="section container">
        <div v-for="message in messages" :key="message.ref" :value="message" class="block">
            {{ message.content }}
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            messages: [],
        }
    },
    mounted() {
        this.socket = this.$nuxtSocket({ name: "chat" })

        this.socket.on('325076714366435528', (message) => {
            this.messages.push(message)
        })
    },
}
</script>