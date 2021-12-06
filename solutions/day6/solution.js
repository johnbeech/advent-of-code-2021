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
      t: value
    }
  })

  return fish
}

function evolve (fish) {
  const evolvedFish = JSON.parse(JSON.stringify(fish))

  const spawnedFish = []
  evolvedFish.forEach(fish => {
    fish.t--
    if (fish.t === -1) {
      fish.t = 6
      spawnedFish.push({ t: 8 })
    }
  })

  return [...evolvedFish, ...spawnedFish]
}

async function solveForFirstStar (input) {
  const startingFish = parseInput(input)

  let fish = startingFish
  const days = [fish]
  while (days.length <= 80) {
    fish = evolve(fish)
    days.push(fish)
  }

  const solution = fish.length
  report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
