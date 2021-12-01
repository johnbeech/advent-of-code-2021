const path = require('path')
const { read, position, write } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseDepths (input) {
  const depths = input.split('\n').map(n => Number.parseInt(n)).map(n => {
    return {
      scan: n
    }
  })

  depths.forEach((depth, index) => {
    const previousDepth = depths[index - 1] || { scan: 0 }
    depth.diff = depth.scan - previousDepth.scan
  })

  return depths
}

async function solveForFirstStar (input) {
  const depths = parseDepths(input)
  const solution = depths.filter(d => d.diff > 0).length - 1

  report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const depths = parseDepths(input)

  depths.forEach((depth, index) => {
    const p1 = depth
    const p2 = depths[index - 1] || { scan: 0 }
    const p3 = depths[index - 2] || { scan: 0 }
    depth.window = p1.scan + p2.scan + p3.scan
  })

  depths.forEach((depth, index) => {
    const previousDepth = depths[index - 1] || { scan: 0 }
    depth.diff = depth.window - previousDepth.window
  })

  await write(fromHere('depths.json'), JSON.stringify(depths, null, 2), 'utf8')

  const solution = depths.filter(d => d.diff > 0).length - 2
  report('Solution 2:', solution)
}

run()
