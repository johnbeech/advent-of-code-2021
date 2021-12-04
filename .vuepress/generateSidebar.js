const { read, write, find, position } = require('promise-path')
const here = position(__dirname)

async function generateSidebar() {
  const fromRoot = position(__dirname, '../')
  const solutions = await find(fromRoot('solutions/**/*.md'))
  const sidebar = solutions.map(filepath => {
    const path = filepath
      .replace(fromRoot(''), '')
      .replace('README.md', '')
    return {
      title: path,
      path
    }
  })

  await write(here('sidebarPreview.json'), JSON.stringify(sidebar, null, 2), 'utf8')

  return sidebar
}

module.exports = generateSidebar