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

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function heightmapToText (heightmap, showBasins) {
  const output = []
  for (let j = 0; j <= heightmap.height; j++) {
    const line = []
    for (let i = 0; i <= heightmap.width; i++) {
      const location = heightmap.get(i, j)
      let symbol = location.h
      symbol = location.basin ? letters.charAt(location.basin % letters.length) : symbol
      symbol = location.flowUp ? symbol : symbol
      symbol = location.flowDown ? symbol : 'v'
      symbol = showBasins && location.h === 9 ? ' ' : symbol
      line.push(symbol)
    }
    output.push(line.join(''))
  }
  return output.join('\n')
}

async function solveForFirstStar (input) {
  const heightmap = parseHeightmap(input)

  const text = heightmapToText(heightmap)
  await write(fromHere('heightmap.txt'), text, 'utf8')

  const solution = stats.sum(heightmap.lowPoints.map(p => p.h + 1))
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const heightmap = parseHeightmap(input)

  const basins = {}
  heightmap.locations.forEach(loc => {
    if (loc.h === 9) {
      return
    }
    let lowest = loc
    let next
    do {
      next = lowest.flowDown
      lowest = next || lowest
    } while (next)
    const basin = basins[lowest.key] || []
    basin.push(loc)
    basins[lowest.key] = basin
  })

  const basinList = Object.values(basins)
  const threeLargest = basinList.sort((a, b) => a.length > b.length ? -1 : 1).slice(0, 3).map(n => n.length)

  basinList.forEach((b, i) => {
    b.forEach(l => {
      l.basin = i
    })
  })

  console.log('Three largest basins:', threeLargest)

  const solution = threeLargest.reduce((acc, item) => acc * item, 1)

  const showBasins = true
  const text = heightmapToText(heightmap, showBasins)
  await write(fromHere('basinmap.txt'), text, 'utf8')

  report('Solution 2:', solution)
}

run()
