<template>
  <div class="single" >
    <!-- v-if="singleData" -->
    <!-- <span v-on:click="test">{{doneTodosCount}}</span> -->
    <!-- <button v-on:click="testtest">test123</button> 
    <div v-for="t1 in test" :key="(t1.data+10)">{{t1.data}}</div>  -->
      <codemirror 
        v-model="code" 
        :options="cmOption" 
        @ready="onEditorReady"
        @input="onEditorChange"
        class="editor">
      </codemirror>
      <!-- <div class="result">{{result.value}}</div> -->
      <!-- <div class="history">
        <div v-for="h in history" :key="h.id">{{h.id}}</div>      
      </div> -->
      <div class="history">
        <history 
          v-for="historyData in history"
          :key="historyData.id"
          :historyData="historyData" 
          v-on:removeSingleHistory="removeSingleHistory"
          :appId="appId" 
          :type="'single'" 
          class=""        
        ></history>
      </div>

  </div>
</template>

<script>
//<!-- @removeHistory="removeHistory" -->
import { mapGetters } from "vuex";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import { uuid } from "vue-uuid";
import History from "./History.vue";

export default {
  name: "SingleView",
  props: ["singleData", "appId", "test"],
  components: {
    codemirror,
    History
  },
  data() {
    return {
      // appId: "",
      code: "",
      // result: { code: "", evaluated: "", value: "" },
      history: [],
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: "text/javascript",
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        extraKeys: { Ctrl: "autocomplete" },
        hintOptions: {
          completeSingle: false
        }
      }
    };
  },
  methods: {
    onEditorReady(editor) {
      var _this = this;
      editor.refresh();

      var map = {
        "Ctrl-Enter": function(cm) {
          _this.calculateExpression();
        },
        "Shift-Enter": function(cm) {
          _this.checkSyntax();
        },
        "Ctrl-Delete": function(cm) {
          console.log("test");
          // _this.removeTab()
        }
      };
      editor.addKeyMap(map);
    },
    onEditorChange: function(code) {
      let _this = this;
    },
    calculateExpression: function() {
      let _this = this;
      let result = {
        id: _this.$uuid.v4(),
        appId: _this.appId,
        code: _this.code,
        codeEvaluated: _this.code,
        result: _this.$uuid.v4(),
        timeStamp: new Date()
      };

      _this.result = result;
      _this.history.unshift(result);
      _this.$store.dispatch("setSingleHistory", result).then(function(n) {});
    },
    removeSingleHistory: function(historyId) {
      let _this = this;
      // _this.history = _this.history.filter(function(a) {
      //   return a.id != historyId
      // });
      _this.$store
        .dispatch("removeSingleHistory", historyId)
        .then(function(n) {});
    },
    test1: function() {
      this.$store.dispatch("test").then(function(n) {});
    }
  },
  watch: {
    code() {
      let _this = this;
      _this.singleData.code = _this.code;
    },
    singleData() {
      let _this = this;
      _this.history = _this.singleData;
    },
    appId: function() {
      // console.log(2)
      this.code = "";
    }
  },
  mounted: function() {
    let _this = this;
    _this.history = _this.singleData;
    // _this.appId = _this.$route.params.id;
    // _this.$store.dispatch("getNotebook", appId).then(function(n) {
    //   _this.code = n.single.code;
    //   _this.history = n.single.history;
    // });
  },
  computed: mapGetters(["doneTodosCount"])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.single {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100px 50px auto;
  grid-gap: 1em;
}

.editor {
  grid-row-start: 1;
}

.result {
  grid-row-start: 2;
}
</style>
