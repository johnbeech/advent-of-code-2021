const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

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

  heightmap.getNeighbours = getNeighbours

  return heightmap
}

async function solveForFirstStar (input) {
  const heightmap = parseHeightmap(input)

  const solution = 'UNSOLVED'
  report('Heightmap:', heightmap)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
