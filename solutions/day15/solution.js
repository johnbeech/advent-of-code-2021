const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)
const { astar, Graph } = require('./astar')

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

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
        r: cell,
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

  heightmap.grid = heightmapToArray(heightmap, (loc) => loc.r)
  heightmap.graph = new Graph(heightmap.grid)
  const { height, width, graph } = heightmap
  const start = graph.grid[0][0]
  const end = graph.grid[height][width]
  const path = astar.search(graph, start, end)
  heightmap.path = path

  path.forEach(step => {
    const cell = get(step.y, step.x)
    cell.visited = true
    step.cell = cell
    const { x, y, weight } = step
    console.log('Step:', { x, y, weight, h: cell.h, r: cell.r, t: cell.r === weight })
  })

  function pad (s) {
    s = s + ''
    while (s.length < 2) {
      s = s + ' '
    }
    return s
  }

  const gridOutput = heightmapToArray(heightmap, (loc) => loc.h).map(l => l.join('')).join('\n')
  console.log('Grid:', `\n${gridOutput}`)

  const pathOutput = heightmapToArray(heightmap, (loc) => pad(!loc.visited ? loc.r : loc.r + '.')).map(l => l.join('')).join('\n')
  console.log('Path:', `\n${pathOutput}`)

  return heightmap
}

function heightmapToArray (heightmap, symbolCallback) {
  const output = []
  for (let j = 0; j <= heightmap.height; j++) {
    const line = []
    for (let i = 0; i <= heightmap.width; i++) {
      const location = heightmap.get(i, j)
      const symbol = symbolCallback(location)
      line.push(symbol)
    }
    output.push(line)
  }
  return output
}

async function solveForFirstStar (input) {
  const heightmap = parseHeightmap(input)

  const path = heightmap.path
  const solution = path.map(n => n.cell.h).reduce((acc, n) => acc + n, 0)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
