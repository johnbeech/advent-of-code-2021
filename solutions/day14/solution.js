const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('test.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parsePolymerInstructions (input) {
  const lines = input.split('\n').map(n => n.trim()).filter(n => n)
  const polymerTemplate = lines.shift()

  const charMap = polymerTemplate.split('').reduce((acc, char) => {
    acc[char] = acc[char] ? acc[char] + 1 : 1
    return acc
  }, {})

  const pairInsertionRules = lines.map(line => {
    const [pair, insert] = line.split(' -> ')
    const [l, r] = pair.split('')
    const left = [l, insert].join('')
    const right = [insert, r].join('')
    return {
      pair,
      insert,
      left,
      right,
      count: 0
    }
  })

  pairInsertionRules.forEach(rule => {
    if (polymerTemplate.includes(rule.pair)) {
      rule.count++
    }
  })

  return {
    polymerTemplate,
    pairInsertionRules,
    charMap
  }
}

function splitPolymer (instructions) {
  const { pairInsertionRules, polymerTemplate, charMap } = instructions

  const map = pairInsertionRules.reduce((acc, item) => {
    acc[item.pair] = JSON.parse(JSON.stringify(item))
    return acc
  }, {})

  pairInsertionRules.forEach(rule => {
    const { count } = rule
    if (count) {
      const left = map[rule.left]
      if (left) {
        left.count = left.count + count
        charMap[rule.left.charAt(1)] = charMap[rule.left.charAt(1)] ? charMap[rule.left.charAt(1)] + count : count
      }
      const right = map[rule.right]
      if (right) {
        right.count = right.count + count
      }
      map[rule.pair].count = map[rule.pair].count - count
    }
  })

  const min = Math.min(...Object.values(charMap))
  const max = Math.max(...Object.values(charMap))

  return {
    pairInsertionRules: Object.values(map),
    polymerTemplate,
    charMap,
    min,
    max
  }
}

async function solveForFirstStar (input) {
  const instructions = parsePolymerInstructions(input)

  report('Instructions:', instructions)

  const splits = []
  let polymer = instructions
  while (splits.length < 10) {
    polymer = splitPolymer(polymer)
    splits.push(polymer)
    console.log(polymer.pairInsertionRules)
  }

  console.log('Polymer', splits.length, 'Min:', polymer.min, 'Max:', polymer.max, polymer.charMap)
  const solution = polymer.max - polymer.min
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const instructions = parsePolymerInstructions(input)
  report('Instructions:', instructions)

  const splits = []
  let polymer = instructions
  while (splits.length < 40) {
    polymer = splitPolymer(polymer)
    splits.push(polymer)
  }

  console.log('Polymer', splits.length, 'Min:', polymer.min, 'Max:', polymer.max, polymer.charMap)
  const solution = polymer.max - polymer.min
  report('Solution 2:', solution)
}

run()
