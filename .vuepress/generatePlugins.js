const { position } = require('promise-path')
const here = position(__dirname)

function generatePlugins() {
  const componentsDir = here('../solutions')
  console.log('Locating components in:', componentsDir)
  const registerComponents = [
    '@vuepress/plugin-register-components', {
      componentsDir
    }
  ]
  return [
    registerComponents
  ]
}

module.exports = generatePlugins