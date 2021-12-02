const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

function parseInstructions (input) {
  const lines = input.trim().split('\n')
  const instructions = lines.map(line => {
    const [direction, distance] = line.split(' ')
    return {
      direction,
      distance: Number.parseInt(distance)
    }
  }).filter(n => n)
  return instructions
}

const commands = {
  forward,
  down,
  up
}

function forward ({ distance }, position) {
  position.x = position.x + distance
}

function down ({ distance }, position) {
  position.y = position.y + distance
}

function up ({ distance }, position) {
  position.y = position.y - distance
}

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
  const instructions = parseInstructions(input)

  report('Input:', instructions)

  const position = {
    x: 0,
    y: 0
  }
  while (instructions.length > 0) {
    const next = instructions.shift()
    const command = commands[next.direction]
    command(next, position)
  }

  const solution = position.x * position.y
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
