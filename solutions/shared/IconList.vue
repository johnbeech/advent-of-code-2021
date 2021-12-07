<template>
  <div class="iconlist">
    <h2>
      <shared-Icon :icon="highlightedIcon || selectedIcon"/>
      <span>{{ highlightedIcon || selectedIcon }}</span>
      <input v-model="iconFilter" placeholder="filter" />
      <shared-Icon icon="trash" class="button" v-on:click.native="clearFilter" />
    </h2>
    <div class="browser">
      <shared-Icon v-for="icon in filteredIcons" :key="icon"
        :icon="icon" :class="selectedIcon === icon ? 'selected' : ''"
        v-on:click.native="selectIcon(icon)"
        v-on:mouseout.native="clearHighlight"
        v-on:mouseover.native="highlightIcon(icon)" />
    </div>
  </div>
</template>

<script>

import { fas } from '@fortawesome/free-solid-svg-icons'

function icons () {
  const all = Object.keys(fas)
  const remapped = all.map(key => {
    return key
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLocaleLowerCase()
      .replace('fa-', '')
      .replace('xray', 'x-ray')
      .replace('hsquare', 'h-square')
      .replace('icursor', 'i-cursor')
      .replace('stopwatch20', 'stopwatch-20')
  }).filter(a => a !== 'font-awesome-logo-full')
  return remapped
}

export default {
  data() {
    return {
      selectedIcon: 'lock',
      highlightedIcon: false,
      iconFilter: ''
    }
  },
  computed: {
    icons,
    filteredIcons() {
      const { iconFilter, icons } = this
      return iconFilter ? icons.filter(n => n.includes(iconFilter)) : icons
    }
  },
  methods: {
    selectIcon(icon) {
      console.log('Select icon?', icon)
      this.selectedIcon = icon
    },
    highlightIcon(icon) {
      this.highlightedIcon = icon
    },
    clearHighlight() {
      this.highlightedIcon = false
    },
    clearFilter() {
      this.iconFilter = ''
    }
  }
}
</script>

<style scoped>
.icon {
  border-radius: 0.5em;
  cursor: zoom-in;
}
h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h2 > .icon {
  font-size: 1.5em;
  flex: 0;
  margin-right: 0.2em;
}
h2 > span {
  margin: 0.2em;
  flex: 10 10;
  white-space: nowrap;
  overflow: hidden;
}
h2 > input {
  font-size: inherit;
  text-align: right;
}
.icon.button {
  font-size: 1em;
  margin-left: 0.2em;
  cursor: pointer;
}
.icon.button:hover {
  color: #666;
}
.icon.button:active {
  color: #333;
}
.browser > .icon:hover {
  background: black;
  color: white;
}
.browser > .icon.selected {
  background: green;
  color: white;
}
.browser > .icon.selected:hover {
  background: turquoise;
}
.browser > .icon:active {
  background: green;
  color: white;
}
</style>