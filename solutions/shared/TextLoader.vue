<template>
  <div class="text loader">
    <pre v-if="text"><code>{{ text }}</code></pre>
    <pre v-if="error"><code>Error: {{ error }}</code></pre>
  </div>
</template>

<script>
import axios from 'axios'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup'

export default {
  data() {
    return {
      text: '',
      error: ''
    }
  },
  props: {
    file: {
      type: String,
      default: ''
    }
  },
  async mounted() {
    const { $site, file, load, loadLocal } = this
    const { LOCAL_AOC_DEV } = $site.themeConfig.env
    if (file) {
      try {
        const response = LOCAL_AOC_DEV ? loadLocal(file) : load(`./${file}`)
        const { data } = await response
        this.text = data
      } catch (ex) {
        this.error = ex.message
      }
      Prism.highlightAll()
    }
  },
  methods: {
    load(url) {
      return axios.get(url)
    },
    loadLocal(file) {
      const { $page } = this
      const filepath = [this.$page.regularPath, file].join('')
      return this.load(`http://localhost:8585${filepath}`)
    }
  }
}
</script>

<style scoped>
div.text.loader > pre {
  max-height: 40vh;
  overflow-y: scroll;
  overflow-x: auto;
}
</style>