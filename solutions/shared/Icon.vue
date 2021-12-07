<template>
  <div class="icon" :title="icon">
     <font-awesome-icon :icon="iconOptions" />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default {
  props: {
    icon: String
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    iconOptions() {
      const icon = this.icon || 'dice'
      return ['fas', icon]
    }
  }
}
</script>

<style scoped>
.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  vertical-align: middle;
  user-select: none;
}
</style>