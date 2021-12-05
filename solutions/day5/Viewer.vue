<template>
  <div>
    <h2>My Solution</h2>
    <h3>Solution Code</h3>
    <pre class="language-js"><code>{{ solutionText }}</code></pre>
    <h3>Input</h3>
    <pre><code>{{ inputText }}</code></pre>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => {
    return {
      solutionText: 'Javascript: ????',
      inputText: 'Input Text: ????'
    }
  },
  computed: {
    solutionTitle() {
      const parts = (document.location + '').split('/')
      return parts.reverse()[1]
    }
  },
  async mounted () {
    this.solutionText = await this.load('./solution.js')
    this.inputText = await this.load('./input.txt')
  },
  methods: {
    async load(url) {
      try {
        const { data } = await axios.get(url)
        return data
      } catch (ex) {
        return `${ex.message} for ${url}`
      }
    }
  }
}
</script>

<style scoped>

</style>