const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseInput (input) {
  const lines = input.split('\n')
    .map(n => n.trim())
    .filter(n => n)
  const puzzles = lines.map(line => parsePuzzleLine(line))
  return puzzles
}

function lookup (code) {
  const numbersByCodeLength = {
    2: 1,
    4: 4,
    3: 7,
    7: 8
  }

  return numbersByCodeLength[code.length] || 0
}

function parsePuzzleLine (line) {
  const [a, b] = line.split('|')
  const codes = a.trim().split(' ')
    .sort((a, b) => a.length > b.length ? -1 : 1)
    .map(code => {
      return {
        code,
        number: lookup(code)
      }
    })
  const output = b.trim().split(' ')
    .map(code => {
      return {
        code,
        number: lookup(code)
      }
    })
  return {
    codes,
    output
  }
}

async function solveForFirstStar (input) {
  const puzzles = parseInput(input)
  const solution = puzzles.reduce((acc, puzzle) => {
    const count = puzzle.output.reduce((po, item) => {
      return po + (item.number ? 1 : 0)
    }, 0)
    return acc + count
  }, 0)

  report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
