const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

const illegalCharScores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const completionScores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

const openSymbols = ['(', '[', '{', '<']
const closeSymbols = [')', ']', '}', '>']

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseLines (input) {
  const lines = input.split('\n').map(n => n.trim()).filter(n => n)
  return lines.map(n => {
    const symbols = n.split('')
    return {
      symbols
    }
  })
}

function checkForIncomplete (puzzle) {
  const open = puzzle.symbols.filter(n => openSymbols.includes(n))
  const close = puzzle.symbols.filter(n => closeSymbols.includes(n))
  return open.length !== close.length
}

function checkForCorrupt (puzzle) {
  const opens = []
  let corrupt = false
  puzzle.symbols.forEach(symbol => {
    if (corrupt) {
      return
    }
    const open = openSymbols.includes(symbol)
    const close = closeSymbols.includes(symbol)
    if (open) {
      opens.push(openSymbols.indexOf(symbol))
    }
    if (close) {
      const openIndex = opens[opens.length - 1]
      const closeIndex = closeSymbols.indexOf(symbol)
      if (openIndex === closeIndex) {
        opens.pop()
      } else {
        corrupt = true
        puzzle.corruptSymbol = symbol
      }
    }
  })
  puzzle.opens = opens
  let score = 0
  while (puzzle.opens.length > 0) {
    const openIndex = opens.pop()
    const matchingBracket = closeSymbols[openIndex]
    const matchingScore = completionScores[matchingBracket]
    score = (score * 5) + matchingScore
    puzzle.symbols.push(matchingBracket)
    puzzle.score = score
  }
  return corrupt
}

async function solveForFirstStar (input) {
  const puzzles = parseLines(input)

  puzzles.forEach(puzzle => {
    puzzle.incomplete = checkForIncomplete(puzzle)
    puzzle.corrupt = checkForCorrupt(puzzle)
  })

  const solution = puzzles
    .filter(n => n.corrupt)
    .map(n => n.corruptSymbol)
    .reduce((acc, symbol) => {
      return acc + illegalCharScores[symbol]
    }, 0)

  report('Input:', puzzles, illegalCharScores)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const puzzles = parseLines(input)

  puzzles.forEach(puzzle => {
    puzzle.incomplete = checkForIncomplete(puzzle)
    puzzle.corrupt = checkForCorrupt(puzzle)
  })

  const completablePuzzles = puzzles
    .filter(p => p.incomplete && !p.corrupt)

  const middle = Math.floor(completablePuzzles.length / 2)

  const solution = completablePuzzles
    .sort((a, b) => a.score > b.score ? -1 : 1)[middle].score

  report('Solution 2:', solution)
}

run()
