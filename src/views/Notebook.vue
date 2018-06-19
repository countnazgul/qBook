<template>
  <div class="home">      
    <Notebook/>
  </div>
</template>

<script>
// @ is an alias to /src
import Notebook from '@/components/Notebook.vue'

export default {
  name: 'notebook',
  components: {
    Notebook
  }
}
</script>
