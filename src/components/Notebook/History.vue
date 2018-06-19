<template>
  <div class="history-record">
    <div v-on:click="showHide" class="header-history">
        <span 
            
            :class="[
                'lui-icon', 
                { 'lui-icon--triangle-bottom': expanded == true }, 
                { 'lui-icon--triangle-right': expanded == false }]" 
            aria-hidden="true"
        ></span>        
        {{historyData.code}}
        <span 
            v-on:click="removeHistory"
            class='lui-icon lui-icon--remove remove-history'
            aria-hidden="true"
        ></span>        
    </div>
    <div v-if="expanded">
        {{historyData.code}}
    </div>    
    <div v-if="expanded">
        {{historyData.id}}
    </div>
    <div v-if="expanded">
        {{historyData.codeEvaluated}}
    </div>    
    <div v-if="expanded">
        {{historyData.timeStamp}}
    </div>
  </div>    
</template>

<script>
export default {
  name: "History",
  props: ["historyData"],
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    showHide: function() {
      let _this = this;
      _this.expanded = !_this.expanded;
    },
    removeHistory: function() {
      let _this = this;
      _this.$emit("removeHistory", _this.historyData);
    }
  },
  mounted: function() {
    // console.log(this.historyData);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.history-record {
  display: grid;
  grid-template-columns: auto;
  /* grid-template-rows: 50px 50px 50px 50px; */
  grid-gap: 1px;
  border-style: solid;
  border-width: 1px;
}

.remove-history {
  float: right;
}

.header-history {
    cursor: pointer;
}
</style>
