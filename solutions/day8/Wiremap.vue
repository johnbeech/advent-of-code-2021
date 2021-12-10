<template>
  <div class="wiremap">
    <div v-for="(wire, index) in Object.keys(wiremap)" :key="`wire-source-${wire}-${index}`"
      :class="`wire ${wire} source ${checkHot(wire)} ${checkWarm(wire)} ${checkRemapped(wire)}`"
      v-on:click="rewireSource(wire)">{{ wire }}</div>
    <div v-for="(wire, index) in Object.keys(wiremap)" :key="`wire-link-${wire}-${index}`"
      :class="`wire link`"
      v-on:click="rewire(wire, wire)"><shared-Icon icon="long-arrow-alt-down" /></div>
    <div v-for="(wire, index) in Object.values(wiremap)" :key="`wire-target-${wire}-${index}`"
      :class="`wire ${wire} target  ${checkHot(wire)} ${checkWarm(wire)} ${checkRemapped(wire)}`"
      v-on:click="rewireDestination(wire)">{{ wire }}</div>
  </div>
</template>

<script>

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
  model: {
    prop: 'wiremap',
    event: 'change'
  },
  props: {
    wiremap: {
      type: Object,
      default: createDefaultWiremap
    }
  },
  data() {
    return {
      localWires: createDefaultWiremap(),
      wireSource: false,
      wireTarget: false,
      lastSource: false,
      lastTarget: false
    }
  },
  computed: {
    activeWires() {
      return this.wiremap || this.localWires || createDefaultWiremap()
    }
  },
  watch: {
    lastSource() {
      this.$forceUpdate()
    },
    lastTarget() {
      this.$forceUpdate()
    }
  },
  methods: {
    rewireSource(wire) {
      this.wireSource = wire
      this.checkForRewire()
    },
    rewireDestination(wire) {
      this.wireTarget = wire
      this.checkForRewire()
    },
    checkHot(wire) {
      const { wireSource, wireTarget } = this
      return [wireSource, wireTarget].filter(n => n).includes(wire) ? 'hot' : ''
    },
    checkWarm(wire) {
      const { lastSource, lastTarget } = this
      return [lastSource, lastTarget].filter(n => n).includes(wire) ? 'warm' : ''
    },
    checkRemapped(wire) {
      return this.activeWires[wire] === wire ? '' : 'remapped'
    },
    checkForRewire() {
      const { wireSource, wireTarget } = this
      if (wireSource && wireTarget) {
        this.rewire(wireSource, wireTarget)
      }
    },
    rewire(source, target) {
      const newWiremap = JSON.parse(JSON.stringify(this.activeWires))
      const swapSource = Object.entries(newWiremap).filter(([s,t]) => t === target)[0][0]
      const swapTarget = newWiremap[source]
      newWiremap[source] = target
      newWiremap[swapSource] = swapTarget
      console.log('Swaps:', swapTarget, swapSource, source, target)
      this.wireSource = false
      this.wireTarget = false
      this.lastSource = source
      this.lastTarget = target
      this.localWires = newWiremap
      this.$emit('change', newWiremap)
      this.$forceUpdate()
      setTimeout(() => {
        this.lastSource = false
        this.lastTarget = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.wiremap {
  display: inline-block;
  overflow: hidden;
  width: 140px;
  height: 90px;
}
.wiremap > .wire {
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
  transition: background-color 0.8s ease-in-out;
}
.wire:hover {
  cursor: pointer;
  background: #666;
}
.wire.remapped {
  background: #900;
}
.wire.remapped:hover {
  background: turquoise;
  transition: background-color 0.1s ease-in-out;
}
.wire.warm {
  background: turquoise;
  color: rgba(0, 0, 0, 0.4);
  transition: background-color 0.2s ease-in-out;
}
.wire.hot {
  background: yellow;
  color: rgba(0, 0, 0, 0.4);
  transition: background-color 0.2s ease-in-out;
}
</style>
