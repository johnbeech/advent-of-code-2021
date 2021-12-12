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

function findAllPaths (graph, allowDoubleVisit) {
  const start = graph.nodes.start
  const end = graph.nodes.end

  const resolvedPaths = []
  const unresolvedPaths = [{ path: [start], smallcave: false }]
  while (unresolvedPaths.length > 0) {
    const unresolvedPath = unresolvedPaths.pop()
    const searchPath = unresolvedPath.path
    const searchHead = searchPath[searchPath.length - 1]
    const searchConnections = searchHead.connections

    const smallcavesInPath = new Set(searchPath.filter(n => n.size === 'small'))
    const multiVisitSmallCaves = Array.from(smallcavesInPath).filter(a => searchPath.filter(b => a === b).length > 1)

    let smallcave = searchPath.smallcave
    if (multiVisitSmallCaves.length === 1) {
      smallcave = multiVisitSmallCaves[0]
    }

    if (multiVisitSmallCaves.length > 1) {
      // throw this path away
    } else if (searchHead === end) {
      resolvedPaths.push(unresolvedPath)
    } else {
      let unresolvedConnections
      if (allowDoubleVisit) {
        if (searchPath.length < 8) {
          console.log('#', searchPath.map(n => n.name).join(' ⮕ '))
        }
        unresolvedConnections = searchConnections
          .filter(c => c !== start)
          .filter(c => c !== smallcave)
      } else {
        unresolvedConnections = searchConnections
          .filter(c => c !== start)
          .filter(c => !searchPath.includes(c) || c.size === 'large')
      }

      const newPaths = unresolvedConnections.map(c => {
        return {
          path: [...searchPath, c],
          smallcave
        }
      })
      unresolvedPaths.push(...newPaths)
    }
  }

  return resolvedPaths
}

async function solveForFirstStar (input) {
  const caveGraph = parseGraph(input)
  const searchPaths = findAllPaths(caveGraph, false)

  const output = searchPaths.map(unresolvedPath => unresolvedPath.path.map(n => n.name).join(' ⮕ '))
  await write(fromHere('paths-part1.txt'), output.join('\n'), 'utf8')

  const solution = searchPaths.length
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const caveGraph = parseGraph(input)
  const searchPaths = findAllPaths(caveGraph, true)

  const output = searchPaths.map(unresolvedPath => unresolvedPath.path.map(n => n.name).join(','))
  await write(fromHere('paths-part2.txt'), output.join('\n'), 'utf8')

  const solution = searchPaths.length
  report('Solution 2:', solution)
}

run()
