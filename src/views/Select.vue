<template>
  <div class="home">      
    <Select msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Select from '@/components/Select.vue'

export default {
  name: 'home',
  components: {
    Select
  }
}
</script>
