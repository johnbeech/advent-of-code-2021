const generateSidebar = require('./generateSidebar')

async function generateVueConfig() {
  const vueConfig = {
    base: '/advent-of-code-2021/',
    themeConfig: {
      sidebar: await generateSidebar()
    }
  }
  return vueConfig
}

module.exports = generateVueConfig