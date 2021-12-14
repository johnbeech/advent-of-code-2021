const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parsePolymerInstructions (input) {
  const lines = input.split('\n').map(n => n.trim()).filter(n => n)
  const polymerTemplate = lines.shift().split('')

  const pairInsertionRules = lines.map(line => {
    const [left, c] = line.split(' -> ')
    const [a, b] = left.split('')
    return {
      a, b, c
    }
  })

  return {
    polymerTemplate,
    pairInsertionRules
  }
}

function splitPolymers (instructions) {
  const { polymerTemplate, pairInsertionRules } = instructions
  const template = polymerTemplate
  const rules = pairInsertionRules
  const newTemplate = []

  template.forEach((k, i) => {
    newTemplate.push(k)
    const next = template[i + 1]
    if (next) {
      const rule = rules.filter(n => n.a === k && n.b === next)[0]
      newTemplate.push(rule.c)
    }
  })

  return {
    polymerTemplate: newTemplate,
    pairInsertionRules: rules
  }
}

function findLowestAndHighest (list) {
  const map = list.reduce((acc, item) => {
    acc[item] = acc[item] ? acc[item] + 1 : 1
    return acc
  }, {})

  const sorted = Object.entries(map).sort((a, b) => a[1] < b[1] ? -1 : 1)
  const lowest = sorted[0]
  const highest = sorted[sorted.length - 1]
  return {
    lowest,
    highest,
    map
  }
}

async function solveForFirstStar (input) {
  const instructions = parsePolymerInstructions(input)
  report('Instructions:', instructions)

  let split = instructions
  const splits = []
  while (splits.length < 10) {
    split = splitPolymers(split)
    splits.push(split)
    console.log(split.polymerTemplate.join(''))
  }

  const lastSplit = split
  const { lowest, highest } = findLowestAndHighest(lastSplit.polymerTemplate)
  const solution = highest[1] - lowest[1]
  report('Solution 1:', solution)
}

function diffMapValues (a, b) {
  const result = {}

  Object.keys(a).forEach(k => {
    result[k] = b[k] - a[k]
  })

  return result
}

async function solveForSecondStar (input) {
  const instructions = parsePolymerInstructions(input)
  report('Instructions:', instructions)

  let split = instructions
  let previousMap
  const splits = []
  while (splits.length < 10) {
    split = splitPolymers(split)
    splits.push(split)
    const { map } = findLowestAndHighest(split.polymerTemplate)
    if (previousMap) {
      console.log('Step diff', diffMapValues(previousMap, map))
    }
    previousMap = map
  }

  const lastSplit = split
  const { lowest, highest } = findLowestAndHighest(lastSplit.polymerTemplate)
  const solution = highest[1] - lowest[1]
  report('Solution 2:', solution)
}

run()
