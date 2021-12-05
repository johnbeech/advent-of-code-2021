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
  const xdiff = Math.abs(start.x - end.x)
  const ydiff = Math.abs(start.y - end.y)
  const total = Math.max(xdiff, ydiff)

  const points = []
  while (points.length < total) {
    const n = points.length
    const ratio = n / total
    points.push({
      x: Math.round(start.x + xdiff * ratio),
      y: Math.round(start.y + ydiff * ratio)
    })
  }

  points.forEach(point => {
    const key = [point.x, point.y].join(':')
    grid[key] = grid[key] ? grid[key] + 1 : 1
    if (grid[key] > 1) {
      grid.overlaps.push(point)
    }
  })
}

async function solveForFirstStar (input) {
  const vectors = parseVentVectors(input)

  const vectorsOfInterest = vectors.filter(v => {
    return v.start.x === v.end.x || v.start.y === v.end.y
  })

  const thermalMap = {
    '0:0': 0,
    overlaps: []
  }

  vectorsOfInterest.forEach(vector => {
    drawLine(vector.start, vector.end, thermalMap)
  })

  report('Input:', vectorsOfInterest, 'analysing', vectorsOfInterest.length, 'of', vectors.length, 'total')

  await write(fromHere('thermalMap.json'), JSON.stringify(thermalMap, null, 2), 'utf8')

  const solution = thermalMap.overlaps.length
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
