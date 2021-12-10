<template>
  <div>
    <h3>Seven Segment Display</h3>

    <div style="background: black; display: inline-block; padding: 0.5em; border-radius: 0.5em;">
      <day8-SegmentDisplay v-model="segment1" :wiremap="wiremap" />
      <day8-SegmentDisplay v-model="segment2" :wiremap="wiremap" />
      <day8-SegmentDisplay v-model="segment3" :wiremap="wiremap" />
      <day8-SegmentDisplay v-model="segment4" :wiremap="wiremap" />
    </div>

    <h3>Wiremap</h3>

    <day8-Wiremap v-model="wiremap" />

    <h3>Puzzles</h3>

    <p>Solution 1: <b>{{ solution1 }}</b></p>

    <div v-for="(puzzle, puzzleIndex) in puzzles" :key="puzzle.codes.map(n => n.code).join('-')"
        v-on:click="selectPuzzle(puzzle)">
      <div style="display: none;">
        <span v-for="(item, index) in puzzle.codes" :key="`${item.code}-${index}`"
          class="puzzle code">#{{ item.number || '?' }} : {{ item.code }}</span>
      </div>
      <div>
        <span class="puzzle number">{{ puzzleIndex }}</span>
        <span v-for="(item, index) in puzzle.output" :key="`${item.code}-${index}`"
          class="puzzle output">#{{ item.number || '?' }} : {{ item.code }}</span>
      </div>
    </div>

    <h3>My Input</h3>
    <shared-TextLoader file="input.txt" v-model="inputText" />

    <h2>My Solution</h2>

    <h3>Solution Code</h3>
    <shared-TextLoader file="solution.js" class="language-js" />

    <h3>README</h3>
    <shared-TextLoader file="README.md" class="language-md" />

    <h3>Viewer</h3>
    <shared-TextLoader file="Viewer.vue" class="language-markup" />
  </div>
</template>

<script>
function parseInput(input) {
  const lines = input.split('\n')
    .map(n => n.trim())
    .filter(n => n)
  const puzzles = lines.map(line => parsePuzzleLine(line))
  return puzzles
}

function lookup(code) {
  const numbersByCodeLength = {
    2: 1,
    4: 4,
    3: 7,
    7: 8
  }

  return numbersByCodeLength[code.length] || 0
}

function parsePuzzleLine(line) {
  const [a, b] = line.split('|')
  const codes = a.trim().split(' ')
    .sort((a, b) => a.length > b.length ? -1 : 1)
    .map(code => {
      return {
        code,
        number: lookup(code)
      }
    })
  const output = b.trim().split(' ')
    .map(code => {
      return {
        code,
        number: lookup(code)
      }
    })
  return {
    codes,
    output
  }
}

function solveForFirstStar(puzzles) {
  return puzzles.reduce((acc, puzzle) => {
    const count = puzzle.output.reduce((po, item) => {
      return po + (item.number ? 1 : 0)
    }, 0)
    return acc + count
  }, 0)
} 

function createDefaultWiremap() {
  return {
    'a': 'a',
    'b': 'b',
    'c': 'c',
    'd': 'd',
    'e': 'e',
    'f': 'f',
    'g': 'g'
  }
}

export default {
  data() {
    return {
      inputText: '',
      solution1: '?',
      selectedPuzzle: false,
      segment1: [],
      segment2: [],
      segment3: [],
      segment4: [],
      wiremap: createDefaultWiremap()
    }
  },
  computed: {
    puzzles() {
      const puzzles = parseInput(this.inputText)
      this.solution1 = solveForFirstStar(puzzles)
      return puzzles
    }
  },
  methods: {
    selectPuzzle(puzzle) {
      this.selectedPuzzle = puzzle
      this.segment1 = puzzle.output[0].code.split('')
      this.segment2 = puzzle.output[1].code.split('')
      this.segment3 = puzzle.output[2].code.split('')
      this.segment4 = puzzle.output[3].code.split('')
      this.wiremap = createDefaultWiremap()
    }
  }
}
</script>

<style scoped>
.puzzle.number {
  display: inline-block;
  margin: 0.2em 0.2em;
  padding: 0.1em 0.2em;
  border: 0.1em;
  background: mediumspringgreen;
  border-radius: 0.2em;
  color: black;
  font-size: 0.8em;
  font-weight: bold;
}
.puzzle.code {
  display: inline-block;
  margin: 0.2em 0.2em;
  padding: 0.1em 0.2em;
  border: 0.1em;
  background: #DDD;
  border-radius: 0.2em;
  color: black;
  font-size: 0.8em;
}
.puzzle.output {
  display: inline-block;
  margin: 0.2em 0.2em;
  padding: 0.1em 0.2em;
  border: 0.1em;
  background: #7CF;
  border-radius: 0.2em;
  color: black;
  font-size: 0.8em;
}
</style>