/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        useTabs: false, //使用tab缩进还是空格，选择false
        tabWidth: 2, //当行是空格先的情况空几个空格 ，选择 2个
        printWidth: 100, //当行字符长度，推荐是80，也有人喜欢100或120
        singleQuote: true, //使用单引号还是双引号，选择true，单引号
        trailingComma: 'none', //在多行输入的尾逗号是否添加，设置为none
        semi: false //语句末尾是否要加分号，默认值true，选择fales表示不加
      }
    ],
    'vue/no-setup-props-destructu': ['off']
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
