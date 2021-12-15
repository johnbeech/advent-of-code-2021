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

function parseHeightmap (input, multiply = 1) {
  const heightmap = {
    width: 0,
    height: 0,
    locations: [],
    map: {}
  }

  const { locations, map } = heightmap

  function createCell (x, y, value) {
    const location = {
      r: value,
      x,
      y,
      key: [x, y].join(':')
    }
    locations.push(location)
    map[location.key] = location
  }

  const lines = input.split('\n').map(n => n.trim()).filter(n => n)
  const baseHeight = lines.length
  const baseWidth = lines[0].length
  lines.forEach((line, y) => {
    const cells = line.split('').map(n => Number.parseInt(n))
    cells.forEach((cell, x) => {
      for (let mj = 0; mj < multiply; mj++) {
        for (let mi = 0; mi < multiply; mi++) {
          const value = (cell + mj + mi - 1) % 9 + 1
          createCell(x + mi * baseWidth, y + mj * baseHeight, value)
        }
      }
    })
  })
  heightmap.height = baseHeight * multiply
  heightmap.width = baseWidth * multiply

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

  return heightmap
}

function heightmapToArray (heightmap, symbolCallback) {
  const output = []
  for (let j = 0; j < heightmap.height; j++) {
    const line = []
    for (let i = 0; i < heightmap.width; i++) {
      const location = heightmap.get(i, j)
      const symbol = symbolCallback(location)
      line.push(symbol)
    }
    output.push(line)
  }
  return output
}

function pad (s) {
  s = s + ''
  while (s.length < 2) {
    s = s + ' '
  }
  return s
}

function findPathThroughHeightmap (heightmap) {
  heightmap.grid = heightmapToArray(heightmap, (loc) => loc.r)
  heightmap.graph = new Graph(heightmap.grid)
  const { height, width, graph } = heightmap
  const start = graph.grid[0][0]
  const end = graph.grid[height - 1][width - 1]
  const path = astar.search(graph, start, end)
  heightmap.path = path

  path.forEach(step => {
    const cell = heightmap.get(step.y, step.x)
    cell.visited = true
    step.cell = cell
  })

  return path
}

async function solveForFirstStar (input) {
  const heightmap = parseHeightmap(input)
  const path = findPathThroughHeightmap(heightmap)

  const gridOutput = heightmapToArray(heightmap, (loc) => loc.r).map(l => l.join('')).join('\n')
  console.log('Grid:', `\n${gridOutput}`)

  const pathOutput = heightmapToArray(heightmap, (loc) => pad(!loc.visited ? loc.r : loc.r + '.')).map(l => l.join('')).join('\n')
  console.log('Path:', `\n${pathOutput}`)

  const solution = path.map(n => n.cell.r).reduce((acc, n) => acc + n, 0)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const sizeIncrease = 5
  const heightmap = parseHeightmap(input, sizeIncrease)
  const path = findPathThroughHeightmap(heightmap)

  const solution = path.map(n => n.cell.r).reduce((acc, n) => acc + n, 0)
  report('Solution 2:', solution)
}

run()
