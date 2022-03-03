<template>
  <div class="sc-message--text" :style="messageColors">
    <template>
      <div class="sc-message--toolbox" :style="{background: messageColors.backgroundColor}">
        <slot name="text-message-toolbox" :message="message" :me="me"> </slot>
      </div>
    </template>
    <slot :message="message" :messageText="messageText" :messageColors="messageColors" :me="me">
      <!-- eslint-disable vue/no-v-html -->
      <p class="sc-message--text-content" v-html="messageText"></p>
      <!--eslint-enable-->
      <p v-if="message.data.meta" class="sc-message--meta" :style="{color: messageColors.color}">
        {{ message.data.meta }}
      </p>
    </slot>
  </div>
</template>

<script>
import escapeGoat from 'escape-goat'
import Autolinker from 'autolinker'
import fmt from 'msgdown'

export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    messageText() {
      const escaped = escapeGoat.escape(this.message.data.text)

      return Autolinker.link(this.messageStyling ? fmt(escaped) : escaped, {
        className: 'chatLink',
        truncate: {length: 50, location: 'smart'}
      })
    },
    me() {
      return this.message.author === 'me'
    }
  },
  methods: {
    ifelse(cond, funcIf, funcElse) {
      return () => {
        if (funcIf && cond) funcIf()
        else if (funcElse) funcElse()
      }
    },
    withConfirm(msg, func) {
      return () => {
        if (confirm(msg)) func()
      }
    }
  }
}
</script>

<style scoped>
a.chatLink {
  color: inherit !important;
}
</style>
