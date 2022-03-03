<template>
    <section class="section">
        <h1 class="title">Open Chats</h1>
        <b-table :data="chats">
            <template>
                <b-table-column v-slot="props" label="Ref" field="ref" searchable>
                    {{ props.row.ref }}
                </b-table-column>
                <b-table-column  v-slot="props" label="User" field="status" searchable>
                    {{ props.row.user }}
                </b-table-column>                     
                <b-table-column v-slot="props" label="Created">
                    {{ $moment(props.row.created_at).fromNow() }}
                </b-table-column>
                <b-table-column v-slot="props">
                    <nuxt-link :to="'/en/chats/open/'+props.row.ref">
                        View
                    </nuxt-link>
                </b-table-column>
            </template>
        </b-table>
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