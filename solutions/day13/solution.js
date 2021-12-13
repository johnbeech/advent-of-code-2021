const path = require('path')
const { read, write, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

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
        key: [x, y].join(':')
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
    folds,
    width,
    height
  }
}

function fold (paper) {
  const newFolds = [...paper.folds]
  const { direction, offset } = newFolds.shift()
  const newCoords = {}
  let newWidth = 0
  let newHeight = 0

  Object.values(paper.coords).forEach(coord => {
    const newCoord = {
      x: coord.x,
      y: coord.y
    }

    if (direction === 'y') {
      newCoord.x = coord.x
      newCoord.y = coord.y < offset ? coord.y : coord.y - Math.abs(coord.y - offset) * 2
    } else if (direction === 'x') {
      newCoord.x = coord.x < offset ? coord.x : coord.x - Math.abs(coord.x - offset) * 2
      newCoord.y = coord.y
    } else {
      console.log('Unknown direction:', direction, offset)
    }
    newCoord.key = [newCoord.x, newCoord.y].join(':')
    newCoords[newCoord.key] = newCoord
    newWidth = Math.max(newWidth, newCoord.x)
    newHeight = Math.max(newHeight, newCoord.y)
  })

  return {
    coords: newCoords,
    folds: newFolds,
    width: newWidth,
    height: newHeight
  }
}

async function printPaper (filename, paper) {
  const output = []

  for (let j = 0; j <= paper.height; j++) {
    const line = []
    for (let i = 0; i <= paper.width; i++) {
      const key = [i, j].join(':')
      const cell = paper.coords[key] ? '#' : '.'
      line.push(cell)
    }
    output.push(line.join(''))
  }

  const result = output.join('\n')
  await write(fromHere(filename), result, 'utf8')
  return result
}

async function solveForFirstStar (input) {
  const paper = parseOrigamiInstructions(input)

  printPaper('unfolded.txt', paper)

  const foldedPaper = fold(paper)

  printPaper('fold-1.txt', foldedPaper)

  const solution = Object.values(foldedPaper.coords).length

  report('Folded paper:', foldedPaper)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  let paper = parseOrigamiInstructions(input)
  while (paper.folds.length > 0) {
    paper = fold(paper)
  }
  const solution = await printPaper('solution2.txt', paper)
  report('Solution 2:', `\n${solution.replace(/\./g, ' ')}`)
}

run()
