const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

function parseReport (input) {
  const lines = input.split('\n')

  const sequences = lines.map(line => line.split('').map(n => Number.parseInt(n)))
  const columns = sequences[0].map((n, i) => {
    return {
      index: i,
      mostCommonBit: 'unknown',
      leastCommonBit: 'unknown',
      ones: 0,
      zeroes: 0
    }
  })

  columns.forEach(column => {
    sequences.forEach(row => {
      const value = row[column.index]
      const counter = value ? 'ones' : 'zeroes'
      column[counter]++
    })
    const { zeroes, ones } = column
    column.mostCommonBit = zeroes > ones ? 0 : 1
    column.leastCommonBit = zeroes > ones ? 1 : 0
  })

  const gammaRate = Number.parseInt(columns.map(c => c.mostCommonBit).join(''), 2)
  const epsilonRate = Number.parseInt(columns.map(c => c.leastCommonBit).join(''), 2)

  const report = {
    sequences,
    columns,
    gammaRate,
    epsilonRate,
    solution: gammaRate * epsilonRate
  }

  return report
}

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
  const engineReport = parseReport(input)
  const solution = engineReport.solution
  report('Report:', engineReport)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
