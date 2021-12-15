const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)
const { astar, Graph } = require('./astar')

async function run () {
  const input = (await read(fromHere('test.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseHeightmap (input) {
  const heightmap = {
    width: 0,
    height: 0,
    locations: [],
    map: {}
  }

  const { locations, map } = heightmap

  const lines = input.split('\n').map(n => n.trim()).filter(n => n)
  lines.forEach((line, y) => {
    const cells = line.split('').map(n => Number.parseInt(n))
    cells.forEach((cell, x) => {
      const location = {
        h: cell,
        r: 10 - cell,
        x,
        y,
        key: [x, y].join(':')
      }
      locations.push(location)
      map[location.key] = location
      heightmap.width = Math.max(heightmap.width, x)
    })
    heightmap.height = Math.max(heightmap.height, y)
  })

  function get (x, y) {
    const key = [x, y].join(':')
    return map[key] || false
  }

  const neighbourOffsets = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
  ]

  function getNeighbours (location) {
    const neighbours = neighbourOffsets.map(n => {
      return get(location.x + n.x, location.y + n.y)
    }).filter(n => n)

    return neighbours
  }

  heightmap.get = get
  heightmap.getNeighbours = getNeighbours

  heightmap.grid = heightmapToArray(heightmap, 'r')
  heightmap.graph = new Graph(heightmap.grid)
  const { height, width, graph } = heightmap
  const start = graph.grid[0][0]
  const end = graph.grid[height - 1][width - 1]
  const path = astar.search(graph, start, end)
  heightmap.path = path

  return heightmap
}

function heightmapToArray (heightmap, symbolProperty) {
  const output = []
  for (let j = 0; j <= heightmap.height; j++) {
    const line = []
    for (let i = 0; i <= heightmap.width; i++) {
      const location = heightmap.get(i, j)
      const symbol = location[symbolProperty]
      line.push(symbol)
    }
    output.push(line)
  }
  return output
}

async function solveForFirstStar (input) {
  const heightmap = parseHeightmap(input)

  const path = heightmap.path
  path.shift()
  const solution = path.map(n => n.weight).reduce((acc, n) => acc + n, 0)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
