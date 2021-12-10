<template>
  <div class="display">
    <div v-for="cell in cells" :key="cell.key"
      :class="`cell ${cell.char} ${cell.on ? 'on' : 'off'}`"
      v-on:click="illuminateGroup(cell.char)">{{ cell.char }} {{ wiremap[cell.char] || 'x' }}</div>
  </div>
</template>

<script>
function cell(x, y, char) {
  return {
    x, y, char,
    key: [x, y].join(':'),
    on: false
  }
}

function createCellSegments() {
  return [
    cell(0, 0, 'x'),
    cell(1, 0, 'a'),
    cell(2, 0, 'a'),
    cell(3, 0, 'a'),
    cell(4, 0, 'a'),
    cell(5, 0, 'x'),
    //
    cell(0, 1, 'b'),
    cell(1, 1, 'x'),
    cell(2, 1, 'x'),
    cell(3, 1, 'x'),
    cell(4, 1, 'x'),
    cell(5, 1, 'c'),
    //
    cell(0, 2, 'b'),
    cell(1, 2, 'x'),
    cell(2, 2, 'x'),
    cell(3, 2, 'x'),
    cell(4, 2, 'x'),
    cell(5, 2, 'c'),
    //
    cell(0, 3, 'x'),
    cell(1, 3, 'd'),
    cell(2, 3, 'd'),
    cell(3, 3, 'd'),
    cell(4, 3, 'd'),
    cell(5, 3, 'x'),
    //
    cell(0, 4, 'e'),
    cell(1, 4, 'x'),
    cell(2, 4, 'x'),
    cell(3, 4, 'x'),
    cell(4, 4, 'x'),
    cell(5, 4, 'f'),
    //
    cell(0, 6, 'e'),
    cell(1, 6, 'x'),
    cell(2, 6, 'x'),
    cell(3, 6, 'x'),
    cell(4, 6, 'x'),
    cell(5, 6, 'f'),
    //
    cell(0, 7, 'x'),
    cell(1, 7, 'g'),
    cell(2, 7, 'g'),
    cell(3, 7, 'g'),
    cell(4, 7, 'g'),
    cell(5, 7, 'x')
  ]
}

export default {
  model: {
    prop: 'segments',
    event: 'change'
  },
  props: {
    segments: {
      type: Array,
      default () {
        return []
      }
    },
    wiremap: {
      type: Object,
      default () {
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
    }
  },
  data() {
    return {
      cells: createCellSegments(),
      localSegments: []
    }
  },
  computed: {
    cellMap() {
      return this.cells.reduce((cellMap, cell) => {
        cellMap[cell.key] = cell
        return cellMap
      }, {})
    },
    illuminatedSegments() {
      return this.segments || this.localSegments || []
    }
  },
  watch: {
    segments() {
      this.illuminateCells()
    },
    wiremap() {
      this.illuminateCells()
    }
  },
  mounted() {
    this.illuminateCells()
  },
  methods: {
    cellGroup(key) {
      return this.cells.filter(n => n.char === key)
    },
    deluminate() {
      this.cells.forEach(cell => {
        cell.on = false
      })
    },
    illuminateGroup(key) {
      const localSegments = this.localSegments
      if (key === 'x') {
        this.deluminate()
        while (localSegments.length > 0) {
          localSegments.pop()
        }
      } else  if (!localSegments.includes(key)) {
        localSegments.push(key)
      }
      this.$emit('change', localSegments)
      this.illuminateCells()
    },
    illuminateCells() {
      const segments = this.illuminatedSegments
      this.cells.forEach(cell => {
        const remappedChar = this.wiremap[cell.char]
        cell.on = segments.includes(remappedChar)
      })
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
  background: black;
  border-radius: 0.5em;
  margin: 0.5em;
}
.display > .cell {
  display: inline-flex;
  overflow: hidden;
  width: 19px;
  height: 29px;
  margin: 0 1px 1px 0;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  font-weight: bold;
  border-radius: 0.2em;
  color: rgba(255, 255, 255, 0.4);
  background: #333;
  font-size: 0.5em;
}
.cell.x {
  color: rgba(255, 255, 255, 0.1);
  background: #333;
}
.cell.on {
  background: yellow;
  color: rgba(0, 0, 0, 0.4);
}
</style>
