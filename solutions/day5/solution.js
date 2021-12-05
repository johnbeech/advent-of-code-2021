const path = require('path')
const { read, write, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseVentVectors (input) {
  const lines = input.split('\n').map(n => n.trim()).filter(n => n)
  const vectors = lines.map(parseVentVector)
  return vectors
}

function parseVentVector (line) {
  const [start, end] = line.split(' -> ')
  return {
    start: pos(start.split(',').map(n => Number.parseInt(n))),
    end: pos(end.split(',').map(n => Number.parseInt(n)))
  }
}

function pos (coords) {
  const [x, y] = coords
  return { x, y }
}

function drawLine (start, end, grid) {
  const xdiff = end.x - start.x
  const ydiff = end.y - start.y
  const total = Math.max(Math.abs(xdiff), Math.abs(ydiff))

  const points = []
  while (points.length <= total) {
    const n = points.length
    const ratio = n / total
    points.push({
      x: Math.round(start.x + (xdiff * ratio)),
      y: Math.round(start.y + (ydiff * ratio))
    })
  }

  points.forEach(point => {
    const key = [point.x, point.y].join(':')
    grid[key] = grid[key] ? grid[key] + 1 : 1
    if (grid[key] > 1) {
      grid.overlaps.push(point)
    }
  })

  grid.width = Math.max(grid.width, end.x, start.x)
  grid.height = Math.max(grid.height, end.y, start.y)
}

async function solveForFirstStar (input) {
  const vectors = parseVentVectors(input)

  const vectorsOfInterest = vectors.filter(v => {
    return v.start.x === v.end.x || v.start.y === v.end.y
  })

  const thermalMap = {
    overlaps: [],
    m: [],
    width: 0,
    height: 0,
    '0:0': 0
  }

  vectorsOfInterest.forEach(vector => {
    drawLine(vector.start, vector.end, thermalMap)
  })

  const thermalGrid = drawThermalGrid(thermalMap)
  await write(fromHere('thermalGrid.txt'), thermalGrid, 'utf8')

  report('Analysing', vectorsOfInterest.length, 'of', vectors.length, 'total')

  await write(fromHere('thermalMap.json'), JSON.stringify(thermalMap, null, 2), 'utf8')

  const setOfOverlaps = new Set(thermalMap.overlaps.map(n => [n.x, n.y].join(':')))
  const solution = setOfOverlaps.size
  report('Solution 1:', solution)
}

function drawThermalGrid (thermalMap) {
  const lines = []
  for (let y = 0; y <= thermalMap.height; y++) {
    const line = []
    for (let x = 0; x <= thermalMap.width; x++) {
      const key = [x, y].join(':')
      const symbol = thermalMap[key] ? thermalMap[key] : '.'
      line.push(symbol)
    }
    lines.push(line.join(''))
  }
  return lines.join('\n')
}

async function solveForSecondStar (input) {
  const vectors = parseVentVectors(input)

  const thermalMap = {
    overlaps: [],
    m: [],
    width: 0,
    height: 0,
    '0:0': 0
  }

  vectors.forEach(vector => {
    drawLine(vector.start, vector.end, thermalMap)
  })

  const thermalGrid = drawThermalGrid(thermalMap)
  await write(fromHere('thermalGridWithDiagonals.txt'), thermalGrid, 'utf8')

  report('Analysing all vectors:', vectors.length, 'total')

  await write(fromHere('thermalMapWithDiagonals.json'), JSON.stringify(thermalMap, null, 2), 'utf8')

  const setOfOverlaps = new Set(thermalMap.overlaps.map(n => [n.x, n.y].join(':')))
  const solution = setOfOverlaps.size
  report('Solution 2:', solution)
}

run()
