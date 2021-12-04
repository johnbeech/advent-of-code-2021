const { read, write, find, position } = require('promise-path')
const md2json = require('@connected-web/md2json')
const here = position(__dirname)

async function readTitle(filepath) {
  const contents = await read(filepath, 'utf8')
  const tokens = md2json.tokens(contents).filter(token => token.name.charAt(0) === 'h')
  return tokens[0]?.text || 'Untitled'  
}

async function generateSidebar() {
  const fromRoot = position(__dirname, '../')
  const markdownFiles = await find(fromRoot('**/*.md'))
  const sidebarFiles = markdownFiles.filter(f => !f.includes('node_modules'))

  const sidebar = await Promise.all(sidebarFiles.map(async (filepath) => {
    const title = await readTitle(filepath)
    const path = filepath
      .replace(fromRoot(''), '')
      .replace('README.md', '') || '/'
    return {
      title,
      path
    }
  }))

  await write(here('sidebarPreview.json'), JSON.stringify(sidebar, null, 2), 'utf8')

  return sidebar.filter(n => n.title !== 'Day N: Template')
}

module.exports = generateSidebar