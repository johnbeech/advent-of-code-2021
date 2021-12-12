<template>
  <div>
    <shared-PanAndZoom class="submarine-tracker" :centerContent="true" v-on:ready="registerPanAndZoom">
      <div v-for="(marker, idx) in markers" :key="`marker-${idx}`"
        :style="markerStyle(marker)" class="marker"></div>
      <div class="submarine" :style="subStyle">
        <label>{{ sub.text }}</label>
      </div>
    </shared-PanAndZoom>

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

const part1Commands = {
  forward,
  down,
  up
}

const part2Commands = {
  forward,
  down: aimDown,
  up: aimUp
}

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

function forward ({ distance }, position) {
  position.x = position.x + distance
  position.y = position.y + position.aim * distance
}

function down ({ distance }, position) {
  position.y = position.y + distance
}

function up ({ distance }, position) {
  position.y = position.y - distance
}

function aimDown ({ distance }, position) {
  position.aim = position.aim + distance
}

function aimUp ({ distance }, position) {
  position.aim = position.aim - distance
}

export default {
  data: () => {
    return {
      inputText: '',
      sub: {
        x: 0,
        y: 0,
        text: 'SUB',
        aim: 0,
        rotation: 0,
        wobble: 0
      },
      running: false,
      subStyle: '',
      instructions: [],
      markers: [{ x: 0, y: 0 }],
      panAndZoom: false,
      animator: false
    }
  },
  mounted() {
    this.animator = setInterval(() => {
      this.advance()
    }, 10)
  },
  methods: {
    advance() {
      if (!this.running) {
        return
      }
      const { sub, instructions } = this
      const next = instructions.shift()
      if (!next) {
        clearInterval(this.animator)
        sub.text = `${sub.x} x ${sub.y}`
        sub.x = 0
        sub.y = 0
        sub.aim = 0
        this.computeSubstyle()
        this.running = false
        return
      }
      const command = part2Commands[next.direction]
      command(next, sub)
      const markers = this.markers
      markers.push({ x: sub.x, y: sub.y })
      while (markers.length > 50) {
        markers.shift()
      }
      this.computeSubstyle()
    },
    computeSubstyle() {
      const { sub, panAndZoom } = this
      sub.rotation = Math.cos(sub.x / sub.aim * 0.01) * 180 / Math.PI
      const style = `position: absolute; left: ${sub.x}px; top: ${sub.y / 100}px; transform: rotate(${sub.rotation + sub.wobble}deg)`
      this.subStyle = style
      if (panAndZoom) {
        panAndZoom.moveTo(-sub.x, -sub.y / 100)
      }
    },
    markerStyle(marker) {
      const style = `position: absolute; left: ${marker.x}px; top: ${marker.y / 100}px;`
      return style
    },
    registerPanAndZoom(panAndZoom) {
      this.panAndZoom = panAndZoom
    }
  },
  watch: {
    inputText() {
      const instructions = parseInstructions(this.inputText)
      this.instructions = instructions
      this.running = true
    }
  }
}
</script>

<style scoped>
.submarine-tracker {
  height: 400px;
  border: 1px solid #ccc;
  background: cornflowerblue;
}
.submarine {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: orange;
  width: 80px;
  height: 30px;
  margin-left: -40px;
  margin-top: -15px;
  overflow: hidden;
  text-align: center;
}
.submarine > label {
  font-size: 12px;
  font-weight: bold;
}
.marker {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  width: 20px;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
  overflow: hidden;
  text-align: center;
}
</style>