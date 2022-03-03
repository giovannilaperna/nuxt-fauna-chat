<template>
  <main>
    <nuxt />
    <CookieControl :locale="$i18n.locale" />
    <Chat />
  </main>
</template>
