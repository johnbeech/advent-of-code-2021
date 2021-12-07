<template>
  <div>
    <h2>My Solution</h2>

    <h3>Solution Code</h3>
    <shared-TextLoader file="solution.js" class="language-js" />

    <h3>Input</h3>
    <shared-TextLoader file="input.txt" />

    <h3>README</h3>
    <shared-TextLoader file="README.md" class="language-md" />

    <h3>Viewer</h3>
    <shared-TextLoader file="Viewer.vue" class="language-markup" />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      solutionText: '',
      inputText: ''
    }
  }
}
</script>

<style scoped>

</style>