const path = require('path')
const { read, position, write } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function parseBoards (acc, line) {
  const currentBoard = acc.currentBoard
  const row = line.split(' ').map(n => n.trim()).filter(n => n).map(n => Number.parseInt(n))
  currentBoard.push(row)
  if (currentBoard.length >= 5) {
    acc.boards.push(currentBoard)
    acc.currentBoard = []
  }
  return acc
}

function transpose (matrix) {
  return matrix.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
  ), [])
}

function createSet (sequence) {
  return sequence
}

function sequenceBoard (board, index) {
  const sets = [
    ...board.map(createSet),
    ...transpose(board).map(createSet)
  ]

  const numbers = board.reduce((acc, row) => {
    acc.push(...row)
    return acc
  }, [])

  return {
    board,
    numbers,
    index,
    sets
  }
}

function parseBingoFrom (input) {
  const lines = input.split('\n')
  const randomDraws = lines.shift().split(',').map(n => Number.parseInt(n))
  const { boards } = lines.map(n => n.trim()).filter(n => n).reduce(parseBoards, { currentBoard: [], boards: [] })

  const sequencedBoards = boards.map(sequenceBoard)

  return {
    randomDraws,
    boards: sequencedBoards,
    drawnNumbers: [],
    winningBoard: false
  }
}

function setContains (set, drawnNumbers) {
  return set.every(n => drawnNumbers.includes(n))
}

function playBingo (bingoGame) {
  const { randomDraws, boards, drawnNumbers } = bingoGame
  const drawNumber = randomDraws.shift()
  drawnNumbers.push(drawNumber)

  if (!Number.isInteger(drawNumber)) {
    console.log('No winner! Ran out of numbers.')
    bingoGame.gameOver = true
    return bingoGame
  }

  let bingo = false
  boards.forEach(board => {
    if (bingo) {
      return
    }
    if (board.numbers.includes(drawNumber)) {
      const bingoSet = board.sets.filter(set => setContains(set, drawnNumbers))[0]
      if (bingoSet) {
        bingo = {
          board,
          set: bingoSet
        }
      }
    }
  })

  if (bingo) {
    bingoGame.winningBoard = bingo.board
    bingoGame.winningSet = bingo.set
    bingoGame.winningBoardUnmarkedNumbers = bingo.board.numbers.filter(n => !bingoGame.drawnNumbers.includes(n))
    bingoGame.lastDrawnNumber = drawNumber

    return bingoGame
  } else {
    return playBingo(bingoGame)
  }
}

async function solveForFirstStar (input) {
  const bingoGame = parseBingoFrom(input)
  const gameResult = playBingo(bingoGame)

  await write(fromHere('bingo.json'), JSON.stringify(gameResult, null, 2), 'utf8')

  const sumOfUnmarkedNumbers = gameResult.winningBoardUnmarkedNumbers.reduce((acc, n) => acc + n, 0)
  const solution = sumOfUnmarkedNumbers * gameResult.lastDrawnNumber
  report('Game Result:', gameResult)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const bingoGame = parseBingoFrom(input)

  const gameResults = bingoGame.boards.map(board => {
    const individualGame = JSON.parse(JSON.stringify(bingoGame))
    individualGame.boards = [board]
    return playBingo(individualGame)
  })

  const sortedResults = gameResults.sort((a, b) => a.drawnNumbers.length > b.drawnNumbers.length ? -1 : 1)
  const lastWinner = sortedResults[0]

  await write(fromHere('sortedResults.json'), JSON.stringify(sortedResults, null, 2), 'utf8')

  const sumOfUnmarkedNumbers = lastWinner.winningBoardUnmarkedNumbers.reduce((acc, n) => acc + n, 0)
  const solution = sumOfUnmarkedNumbers * lastWinner.lastDrawnNumber

  report('Solution 2:', solution)
}

run()
