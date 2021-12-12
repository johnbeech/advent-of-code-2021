<template>
  <div>
    <ul>
      <li>
        <label>Solution 1:</label>
        <b>{{ solution1.solution }}</b>
      </li>
      <li>
        <label>Solution 2:</label>
        <b>{{ solution2.solution }}</b>
      </li>
    </ul>

    <h2>Visualisation</h2>

    <svg v-if="solution1.depths" :viewBox="`0 0 ${viewWidth} ${viewHeight}`" xmlns="http://www.w3.org/2000/svg" width="100%">
      <rect :width="viewWidth" :height="viewHeight" fill="navy" />
      <rect v-for="(box, idx) in depthsInView(solution1.depths)" :key="`box-${idx}`" fill="brown"
        :x="`${idx * 10}`" :y="`${50 + Math.round(box.scan / 10)}`" width="10"
        :height="`${viewHeight - Math.round(box.scan / 10)}`"
        :class="boxDiffClass(box)" />
      <g :transform="`translate(${Math.min(submarine.x, viewWidth / 2)}, ${submarine.y})`">
        <circle cx="-10" r="5" fill="orange" />
        <rect x="-10" width="20" y="-5" height="10" fill="orange" />
        <circle cx="10" r="5" fill="orange" />
      </g>
      <text :x="viewWidth - 10" y="20"
        width="100" height="20"
        fill="white" class="label"
        text-anchor="end">Downwards count: {{ solution1.diffCount }}</text>
    </svg>

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


function parseDepths (input) {
  const depths = input.split('\n').map(n => Number.parseInt(n)).map(n => {
    return {
      scan: n
    }
  })

  depths.forEach((depth, index) => {
    const previousDepth = depths[index - 1] || { scan: NaN }
    depth.diff = depth.scan - previousDepth.scan
  })

  return depths
}

async function solveForFirstStar (input) {
  const depths = parseDepths(input)
  return {
    depths,
    solution: depths.filter(d => d.diff > 0).length
  }
}

async function solveForSecondStar (input) {
  const depths = parseDepths(input)

  depths.forEach((depth, index) => {
    const p1 = depth
    const p2 = depths[index - 1] || { scan: NaN }
    const p3 = depths[index - 2] || { scan: NaN }
    depth.window = p1.scan + p2.scan + p3.scan
  })

  depths.forEach((depth, index) => {
    const previousDepth = depths[index - 1] || { scan: 0 }
    depth.diff = depth.window - previousDepth.window
  })

  return {
    depths,
    solution: depths.filter(d => d.diff > 0).length
  }
}

export default {
  data: () => {
    return {
      inputText: '',
      solution1: { solution: '?' },
      solution2: { solution: '?' },
      timestep: 0,
      viewWidth: 740,
      viewHeight: 400
    }
  },
  computed: {
    submarine() {
      const { viewWidth } = this
      const depths = this.solution1.depths
      return {
        x: Math.min(depths.length * 10 - (viewWidth / 2), this.timestep),
        y: 20
      }
    }
  },
  watch: {
    async inputText() {
      const { inputText } = this
      this.solution1 = await solveForFirstStar(inputText)
      this.solution2 = await solveForSecondStar(inputText)
    }
  },
  mounted() {
    const self = this
    setInterval(() => {
      self.timestep++
    }, 10)
  },
  methods: {
    depthsInView(depths) {
      const { submarine } = this
      const sliceStart = Math.round(submarine.x / 10)
      const sliceWidth = 74
      const depthScans = depths.slice(sliceStart, sliceStart + sliceWidth)

      this.solution1.diffCount = depths.slice(0, sliceStart).filter(d => d.diff > 0).length

      while (depthScans.length < sliceWidth) {
        depthScans.push(depthScans[depthScans.length - 1])
      }

      return depthScans
    },
    boxDiffClass(box) {
      if (box.diff === 0) {
        return 'flat'
      }
      return (box.diff > 0) ? 'up' : 'down'
    }
  }
}
</script>

<style scoped>
rect.flat {
  fill: burlywood;
}
rect.up {
  fill: darkgoldenrod;
}
rect.down {
  fill: brown;
}
text.label {
  font-weight: bold;
  text-align: right;
  font-family: monospace;
}
</style>