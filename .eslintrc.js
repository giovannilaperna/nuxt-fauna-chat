module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    "vue/attribute-hyphenation": "off",
    // https://eslint.vuejs.org/rules/no-lone-template.html
    "vue/no-lone-template": ["error", { "ignoreAccessible": false }],
    "vue/no-lone-template": [0, { "ignoreAccessible": false }],
    // https://stackoverflow.com/questions/70346829/eslint-vue-multiword-components/70348541
    'vue/multi-word-component-names': 0, // disable this rule just for views
    'no-console': 'off',
    // https://stackoverflow.com/questions/52254313/identifier-is-not-a-camel-case
    "camelcase": ["error", {"properties": "never"}],
    "camelcase": ["error", {"allow": [
      "foo_bar",
    ]}],
  },
}