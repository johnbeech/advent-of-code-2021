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
  const values = input.split(',')
    .map(n => n.trim())
    .filter(n => n)
    .map(n => Number.parseInt(n))

  const fish = values.map((value) => {
    return {
      t: value,
      c: 1
    }
  })

  return fish
}

function evolve (fish) {
  const evolvedFish = JSON.parse(JSON.stringify(fish))

  let spawnedFish = 0
  evolvedFish.forEach(fish => {
    fish.t--
    if (fish.t === -1) {
      fish.t = 6
      spawnedFish += fish.c
    }
  })

  const fishGroup = {
    t: 8,
    c: spawnedFish
  }

  return [...evolvedFish, fishGroup]
}

async function solveForFirstStar (input) {
  const startingFish = parseInput(input)

  let fish = startingFish
  const days = [fish]
  while (days.length <= 80) {
    fish = evolve(fish)
    days.push(fish)
  }

  const solution = fish.reduce((acc, f) => {
    return acc + f.c
  }, 0)
  report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const startingFish = parseInput(input)

  let fish = startingFish
  const days = [fish]
  while (days.length <= 256) {
    fish = evolve(fish)
    days.push(fish)
  }

  const solution = fish.reduce((acc, f) => {
    return acc + f.c
  }, 0)
  report('Solution 2:', solution)
}

run()
