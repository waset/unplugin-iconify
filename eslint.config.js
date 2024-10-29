import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  typescript: true,
  languageOptions: {
    parserOptions: {
      warnOnUnsupportedTypeScriptVersion: false,
    },
  },
  vue: true,
  rules: {
    'no-unused-vars': 'warn',
  },
})
