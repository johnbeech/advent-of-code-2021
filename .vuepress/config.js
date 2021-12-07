const { position } = require('promise-path')
const generatePlugins = require('./generatePlugins')
const generateSidebar = require('./generateSidebar')
const { name, logName } = require('../package.json')

async function generateVueConfig() {
  const fromHere = position(__dirname)
  const vueConfig = {
    base: `/${name}/`,
    title: logName,
    themeConfig: {
      sidebar: await generateSidebar(),
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Source', link: 'https://github.com/johnbeech/advent-of-code-2021/' }
      ],
      siteRoot: fromHere('../'),
      env: {
        LOCAL_AOC_DEV: process.env.LOCAL_AOC_DEV
      }
    },
    plugins: await generatePlugins(),
  }
  return vueConfig
}

module.exports = generateVueConfig