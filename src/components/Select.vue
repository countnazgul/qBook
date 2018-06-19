<template>
  <div class="select">
    
        <select @change="appSelected" v-model="value" class="lui-select  lui-select--large">
          <option v-for="document in $store.state.documents" 
                        :key="document.qDocId"        
                        :value="document.qDocId">
                        {{ document.qTitle }}
          </option>
</select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {},
  data() {
    return {
      value: ""
    };
  },
  methods: {
    appSelected: function() {
      let _this = this

      _this.$router.push({
        name: "app",
        params: { id: _this.value }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 2vw 30vw;
  grid-gap: 1em;
}
</style>
