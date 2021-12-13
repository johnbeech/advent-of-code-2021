const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('test.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseOrigamiInstructions (input) {
  const coordRegex = /(\d+),(\d+)/
  const foldRegex = /fold along ([xy])=(\d+)/

  const lines = input.split('\n')
    .map(n => n.trim()).filter(n => n)

  const coords = {}
  const folds = []
  let width = 0
  let height = 0

  lines.forEach(line => {
    if (coordRegex.test(line)) {
      const [, x, y] = line.match(coordRegex)
      const coord = {
        x: Number.parseInt(x),
        y: Number.parseInt(y),
        key: `${x}:${y}`
      }
      coords[coord.key] = coord
      width = Math.max(width, Number.parseInt(x))
      height = Math.max(height, Number.parseInt(y))
    }
    if (foldRegex.test(line)) {
      const [, direction, offset] = line.match(foldRegex)
      const fold = {
        direction,
        offset: Number.parseInt(offset)
      }
      folds.push(fold)
    }
  })

  return {
    coords,
    folds
  }
}

async function solveForFirstStar (input) {
  const instructions = parseOrigamiInstructions(input)
  const solution = 'UNSOLVED'
  report('Instructions:', instructions)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
