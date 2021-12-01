const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
  const depths = input.split('\n').map(n => Number.parseInt(n)).map(n => {
    return {
      scan: n
    }
  })

  depths.forEach((depth, index) => {
    const previousDepth = depths[index - 1] || { scan: 0 }
    depth.diff = depth.scan - previousDepth.scan
  })

  const solution = depths.filter(d => d.diff > 0).length - 1

  report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
