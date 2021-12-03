const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

function mostCommonLeastCommon (sequences) {
  const columns = sequences[0].map((n, i) => {
    return {
      index: i,
      mostCommonBit: 'unknown',
      leastCommonBit: 'unknown',
      ones: 0,
      zeroes: 0
    }
  })

  columns.forEach(column => updateColumn(column, sequences, true))

  return columns
}

function updateColumn (column, sequences, roundDown) {
  column.ones = 0
  column.zeroes = 0
  sequences.forEach(row => {
    const value = row[column.index]
    const counter = value ? 'ones' : 'zeroes'
    column[counter]++
  })
  const { zeroes, ones } = column
  if (roundDown) {
    column.mostCommonBit = ones > zeroes ? 1 : 0
    column.leastCommonBit = ones > zeroes ? 0 : 1
  } else {
    column.mostCommonBit = ones >= zeroes ? 1 : 0
    column.leastCommonBit = ones >= zeroes ? 0 : 1
  }
}

function parseReport (input) {
  const lines = input.split('\n')

  const sequences = lines.map(line => line.split('').map(n => Number.parseInt(n)))
  const columns = mostCommonLeastCommon(sequences)

  const gammaRate = Number.parseInt(columns.map(c => c.mostCommonBit).join(''), 2)
  const epsilonRate = Number.parseInt(columns.map(c => c.leastCommonBit).join(''), 2)

  let oxygenSequences = sequences
  const oxygenColumn = columns.map(column => {
    updateColumn(column, oxygenSequences)
    if (oxygenSequences.length > 1) {
      oxygenSequences = oxygenSequences.filter(row => row[column.index] === column.mostCommonBit)
    }
    if (oxygenSequences.length === 1) {
      column.mostCommonBit = oxygenSequences[0][column.index]
      column.leastCommonBit = oxygenSequences[0][column.index]
    }
    // console.log('Oxygen Sequences', oxygenSequences)
    return column
  })
  const oxygenGeneratorRating = Number.parseInt(oxygenColumn.map(c => c.mostCommonBit).join(''), 2)

  let co2Sequences = sequences
  const co2Column = columns.map(column => {
    updateColumn(column, co2Sequences)
    if (co2Sequences.length > 1) {
      co2Sequences = co2Sequences.filter(row => row[column.index] === column.leastCommonBit)
    }
    if (co2Sequences.length === 1) {
      column.mostCommonBit = co2Sequences[0][column.index]
      column.leastCommonBit = co2Sequences[0][column.index]
    }
    // console.log('CO2 Sequences', co2Sequences)
    return column
  })
  const co2ScrubberRating = Number.parseInt(co2Column.map(c => c.leastCommonBit).join(''), 2)

  const report = {
    sequences,
    columns,
    gammaRate,
    epsilonRate,
    oxygenGeneratorRating,
    co2ScrubberRating
  }

  return report
}

async function run () {
  const input = (await read(fromHere('test.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
  const engineReport = parseReport(input)
  const { gammaRate, epsilonRate } = engineReport
  const solution = gammaRate * epsilonRate
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const engineReport = parseReport(input)

  const { oxygenGeneratorRating, co2ScrubberRating } = engineReport
  const solution = oxygenGeneratorRating * co2ScrubberRating
  report('Report:', engineReport)
  report('Solution 2:', solution)
}

run()
