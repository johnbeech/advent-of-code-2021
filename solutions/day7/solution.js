const path = require('path')
const { read, position } = require('promise-path')
const stats = require('stats-lite')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseCrabs (input) {
  return input.split(',')
    .map(n => n.trim())
    .filter(n => n)
    .map(n => Number.parseInt(n))
    .map((x, index) => {
      return {
        index,
        x
      }
    })
    .sort((a, b) => a.x > b.x ? 1 : -1)
}

async function solveForFirstStar (input) {
  const crabs = parseCrabs(input)

  const positions = crabs.map(c => c.x)
  const min = Math.min(...positions)
  const max = Math.max(...positions)
  const fuelDistances = []
  while (fuelDistances.length < max) {
    const moves = crabs.map(c => Math.abs((min + fuelDistances.length) - c.x))
    const distance = stats.sum(moves)
    fuelDistances.push(distance)
  }

  const solution = Math.min(...fuelDistances)
  report('Solution 1:', solution)
  report('Modes', stats.mode(positions))
}

function calcFuelCost (n) {
  return n * (n + 1) / 2
}

async function solveForSecondStar (input) {
  const crabs = parseCrabs(input)

  const positions = crabs.map(c => c.x)
  const min = Math.min(...positions)
  const max = Math.max(...positions)
  const fuelDistances = []
  while (fuelDistances.length < max) {
    const moves = crabs.map(c => {
      const dist = Math.abs((min + fuelDistances.length) - c.x)
      const fuelCost = calcFuelCost(dist)
      return fuelCost
    })
    const distance = stats.sum(moves)
    fuelDistances.push(distance)
  }

  const solution = Math.min(...fuelDistances)
  report('Solution 2:', solution)
}

run()
