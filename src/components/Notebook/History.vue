<template>
  <div class="history-record">
    <div v-on:click="showHide" class="header-history">
        <span             
            :class="[
                'lui-icon', 
                'interations',
                { 'lui-icon--triangle-bottom': expanded == true }, 
                { 'lui-icon--triangle-right': expanded == false }]" 
            aria-hidden="true"
        ></span>        
        {{historyData.code}}
        <span 
            v-on:click="reloadHistory"
            class='lui-icon lui-icon--reload'
            aria-hidden="true"
        ></span>           
        <span 
            v-on:click="removeHistory"
            class='lui-icon lui-icon--remove remove-history'
            aria-hidden="true"
        ></span>        
    </div>
    <div v-if="expanded">
        Result: {{historyData.result}}
    </div>      
    <div v-if="expanded">
        Code: {{historyData.code}}
    </div>    
    <div v-if="expanded">
        Evaluated code: {{historyData.codeEvaluated}}
    </div>    
    <div v-if="expanded">
        ID: {{historyData.id}}
    </div>    
    <div v-if="expanded">
        Timestamp: {{historyData.timeStamp}}
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
    },
    reloadHistory: function() {
        console.log('https://youtu.be/T8oTlWwAPFI?t=65')
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
  /* border-style: solid;
  border-width: 1px; */
}

.header-history {
  display: grid;
  grid-template-columns: 20px auto 20px 20px;
  /* grid-template-rows: 50px 50px 50px 50px; */
  grid-gap: 1px;
  /* border-style: solid;
  border-width: 1px; */
}

.remove-history {
  /* float: right; */
}

.header-history {
  cursor: pointer;
}

.interations {
  font-size: 20px;
}
</style>
