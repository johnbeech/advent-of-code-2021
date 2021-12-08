<template>
  <div class="display">
    <div v-for="cell in cells" :key="cell.key"
      :class="`cell ${cell.char} ${cell.on ? 'on' : 'off'}`"
      v-on:click="illuminateGroup(cell.char)">{{ cell.char }}</div>
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
  data() {
    return {
      cells: createCellSegments()
    }
  },
  computed: {
    cellMap() {
      return this.cells.reduce((cellMap, cell) => {
        cellMap[cell.key] = cell
        return cellMap
      }, {})
    }
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
      if (key === 'x') {
        return this.deluminate()
      }
      const group = this.cellGroup(key)
      group.forEach(cell => {
        cell.on = !cell.on
      })
      console.log('Illuminate:', key, group)
    },
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
}
.cell.x {
  opacity: 0.1;
}
.cell.on {
  background: yellow;
  color: rgba(0, 0, 0, 0.4);
}
</style>
