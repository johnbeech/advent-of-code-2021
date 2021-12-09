const path = require('path')
const stats = require('stats-lite')
const { read, write, position } = require('promise-path')
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
    console.log('Location:', location.key, location.h,
      'FD', fd ? (fd.key + ' ' + fd.h) : 'v', 'FU', fu ? (fu.key + ' ' + fu.h) : '^')
  })

  const lowPoints = heightmap.locations.filter(n => !n.flowDown)
  const highPoints = heightmap.locations.filter(n => !n.flowUp)

  heightmap.lowPoints = lowPoints
  heightmap.highPoints = highPoints
  heightmap.get = get

  return heightmap
}

async function solveForFirstStar (input) {
  const heightmap = parseHeightmap(input)
  const solution = stats.sum(heightmap.lowPoints.map(p => p.h + 1))

  const output = []
  for (let j = 0; j <= heightmap.height; j++) {
    const line = []
    for (let i = 0; i <= heightmap.width; i++) {
      const location = heightmap.get(i, j)
      let symbol = location.h
      symbol = location.flowUp ? symbol : symbol
      symbol = location.flowDown ? symbol : 'v'
      line.push(symbol)
    }
    output.push(line.join(''))
  }

  await write(fromHere('heightmap.txt'), output.join('\n'), 'utf8')

  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
