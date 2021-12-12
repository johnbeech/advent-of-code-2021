const path = require('path')
const { read, write, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseGraph (input) {
  const graph = {}
  const nodes = {}

  const connections = input.split('\n').map(line => {
    const [a, b] = line.split('-')
    nodes[a] = nodes[a] || {
      name: a,
      size: a.toLowerCase() === a ? 'small' : 'large',
      connections: []
    }
    nodes[b] = nodes[b] || {
      name: b,
      size: b.toLowerCase() === b ? 'small' : 'large',
      connections: []
    }
    const connection = { a, b, anode: nodes[a], bnode: nodes[b] }
    nodes[a].connections.push(nodes[b])
    nodes[b].connections.push(nodes[a])
    return connection
  })

  Object.values(nodes).forEach(node => {
    node.connectionCount = node.connections.length
  })

  graph.connections = connections
  graph.nodes = nodes

  return graph
}

function findAllPaths (graph) {
  const start = graph.nodes.start
  const end = graph.nodes.end

  const resolvedPaths = []
  const unresolvedPaths = [[start]]
  while (unresolvedPaths.length > 0) {
    const nodePath = unresolvedPaths.pop()
    console.log('Search:', nodePath.map(n => n.name).join(' ⮕ '))
    const mostRecent = nodePath[nodePath.length - 1]
    if (mostRecent === end) {
      resolvedPaths.push(nodePath)
    } else {
      const unresolvedConnections = mostRecent.connections
        .filter(c => !nodePath.includes(c) || c.size === 'large')
      const newPaths = unresolvedConnections.map(c => [...nodePath, c])
      unresolvedPaths.push(...newPaths)
    }
  }

  return resolvedPaths
}

async function solveForFirstStar (input) {
  const caveGraph = parseGraph(input)
  const searchPaths = findAllPaths(caveGraph)

  const output = searchPaths.map(nodePath => nodePath.map(n => n.name).join(' ⮕ '))
  await write(fromHere('paths.txt'), output.join('\n'), 'utf8')

  const solution = searchPaths.length
  // report('Cave Graph:', caveGraph)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
