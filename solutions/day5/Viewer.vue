<template>
  <div>
    <h2>Hello AoC!</h2>
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
    this.solutionText = (await axios.get('./solution.js')).data
    this.inputText = (await axios.get('./input.txt')).data
  }
}
</script>

<style scoped>

</style>