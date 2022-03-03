<template>
    <section class="section container">
        <div class="block">
            <nuxt-link :to="localePath({ name: 'foo'})">foo</nuxt-link>
        </div>
        <div class="block">
            <nuxt-link :to="localePath({ name: 'bar'})">bar</nuxt-link>
        </div>
        <div class="buttons">
            <nuxt-link
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
                class="button is-white">
                {{ locale.name }}
            </nuxt-link>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        availableLocales() {
            return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
        }
    },
}
</script>