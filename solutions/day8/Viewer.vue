<template>
  <div>
    <h3>Seven Segment Display</h3>
    <div class="display">
      <div v-for="cell in cells" :class="`cell ${cell.char}`" :key="cell.key">{{ cell.char }}</div>
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

function cell(x, y, char) {
  return {
    x, y, char,
    key: [x, y].join(':')
  }
}

export default {
  data: () => {
    return {
      inputText: ''
    }
  },
  computed: {
    cells() {
      return [
        cell(0, 0, 'x'),
        cell(1, 0, 'a'),
        cell(2, 0, 'a'),
        cell(3, 0, 'a'),
        cell(4, 0, 'a'),
        cell(0, 0, 'x'),
        //
        cell(0, 0, 'b'),
        cell(1, 0, 'x'),
        cell(2, 0, 'x'),
        cell(3, 0, 'x'),
        cell(4, 0, 'x'),
        cell(0, 0, 'c'),
        //
        cell(0, 0, 'b'),
        cell(1, 0, 'x'),
        cell(2, 0, 'x'),
        cell(3, 0, 'x'),
        cell(4, 0, 'x'),
        cell(0, 0, 'c'),
        //
        cell(0, 0, 'x'),
        cell(1, 0, 'd'),
        cell(2, 0, 'd'),
        cell(3, 0, 'd'),
        cell(4, 0, 'd'),
        cell(0, 0, 'x'),
        //
        cell(0, 0, 'e'),
        cell(1, 0, 'x'),
        cell(2, 0, 'x'),
        cell(3, 0, 'x'),
        cell(4, 0, 'x'),
        cell(0, 0, 'f'),
        //
        cell(0, 0, 'e'),
        cell(1, 0, 'x'),
        cell(2, 0, 'x'),
        cell(3, 0, 'x'),
        cell(4, 0, 'x'),
        cell(0, 0, 'f'),
        //
        cell(0, 0, 'x'),
        cell(1, 0, 'g'),
        cell(2, 0, 'g'),
        cell(3, 0, 'g'),
        cell(4, 0, 'g'),
        cell(0, 0, 'x'),
      ]
    },
    cellMap() {
      return this.cells.reduce((cellMap, cell) => {
        cellMap[cell.key] = cell
        return cellMap
      }, {})
    }
  }
}
</script>

<style scoped>
.display {
  display: inline-block;
  overflow: hidden;
  width: 120px;
  height: 210px;
}
.display > .cell {
  display: inline-flex;
  overflow: hidden;
  width: 20px;
  height: 30px;
  align-content: center;
  justify-content: center;
  font-weight: bold;
}
.cell.x {
  opacity: 0.1;
}
</style>
