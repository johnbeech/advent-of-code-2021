const path = require('path')
const { read, position, write } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseOctopusGrid (input) {
  const octopusMap = {
    width: 0,
    height: 0,
    locations: [],
    map: {},
    flashes: 0
  }

  const { locations, map } = octopusMap

  const lines = input.split('\n').map(n => n.trim()).filter(n => n)
  lines.forEach((line, y) => {
    const cells = line.split('').map(n => Number.parseInt(n))
    cells.forEach((cell, x) => {
      const location = {
        energy: cell,
        x,
        y,
        key: [x, y].join(':')
      }
      locations.push(location)
      map[location.key] = location
      octopusMap.width = Math.max(octopusMap.width, x)
    })
    octopusMap.height = Math.max(octopusMap.height, y)
  })

  function get (x, y) {
    const key = [x, y].join(':')
    return map[key] || false
  }

  const neighbourOffsets = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 }
  ]

  function getNeighbours (location) {
    const neighbours = neighbourOffsets.map(n => {
      return get(location.x + n.x, location.y + n.y)
    }).filter(n => n)

    return neighbours
  }

  locations.forEach(location => {
    const neighbours = getNeighbours(location)
    location.neighbours = neighbours
      .sort((a, b) => a.h < b.h ? -1 : 1)
    const ln = neighbours[0]
    const hn = neighbours[neighbours.length - 1]
    const fd = ln.h <= location.h ? ln : false
    const fu = hn.h >= location.h ? hn : false
    location.flowDown = fd
    location.flowUp = fu
  })

  const lowPoints = locations.filter(n => !n.flowDown)
  const highPoints = locations.filter(n => !n.flowUp)

  octopusMap.lowPoints = lowPoints
  octopusMap.highPoints = highPoints
  octopusMap.get = get

  return octopusMap
}

const letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function gridToText (grid) {
  const output = []
  for (let j = 0; j <= grid.height; j++) {
    const line = []
    for (let i = 0; i <= grid.width; i++) {
      const location = grid.get(i, j)
      const symbol = letters.charAt(location.energy)
      line.push(symbol)
    }
    output.push(line.join(''))
  }
  return output.join('\n')
}

function evolve (octopusGrid) {
  const { locations } = octopusGrid

  locations.forEach(loc => {
    loc.energy = loc.energy + 1
  })

  const flashLocations = [...locations].filter(l => l.energy === 10)

  while (flashLocations.length > 0) {
    const loc = flashLocations.pop()
    if (loc.energy > 9) {
      loc.neighbours.forEach(n => {
        n.energy = n.energy + 1
        if (n.energy === 10) {
          flashLocations.push(n)
        }
      })
    }
  }

  locations.forEach(loc => {
    if (loc.energy > 9) {
      loc.energy = 0
      octopusGrid.flashes = octopusGrid.flashes + 1
    }
  })
}

async function solveForFirstStar (input) {
  const octupusGrid = parseOctopusGrid(input)

  console.log(gridToText(octupusGrid))
  console.log('...')

  const steps = []
  while (steps.length < 100) {
    evolve(octupusGrid)
    steps.push(gridToText(octupusGrid))
  }

  await write(fromHere('flashes.txt'), steps.join('\n\n'), 'utf8')

  const solution = octupusGrid.flashes
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
