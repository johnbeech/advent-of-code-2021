<template>
  <div>
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
export default {
  data: () => {
    return {
      inputText: ''
    }
  }
}
</script>

<style scoped>

</style>