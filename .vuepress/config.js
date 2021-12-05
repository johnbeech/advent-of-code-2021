const generatePlugins = require('./generatePlugins')
const generateSidebar = require('./generateSidebar')
const { name, logName } = require('../package.json')

async function generateVueConfig() {
  const vueConfig = {
    base: `/${name}/`,
    title: logName,
    themeConfig: {
      sidebar: await generateSidebar()
    },
    plugins: await generatePlugins()
  }
  return vueConfig
}

module.exports = generateVueConfig