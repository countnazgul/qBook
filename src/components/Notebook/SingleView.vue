<template>
  <div class="single" v-if="singleData">
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
          v-for="historyData in singleData"
          :key="historyData.id"
          :historyData="historyData" 
          :appId="appId" 
          :type="'single'" 
          class=""        
        ></history>
      </div>

  </div>
</template>

<script>
//<!-- @removeHistory="removeHistory" -->
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import { uuid } from "vue-uuid";
import History from "./History.vue";

export default {
  name: "SingleView",
  props: ["singleData", "appId"],
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
      _this.singleData.unshift(result);
      _this.$store.dispatch("setSingleHistory", result).then(function(n) {});
    }
  },
  watch: {
    code() {
      let _this = this;
      _this.singleData.code = _this.code;
    },
    singleData() {
      let _this = this;
    }
  },
  mounted: function() {
    let _this = this;
    // _this.appId = _this.$route.params.id;
    // _this.$store.dispatch("getNotebook", appId).then(function(n) {
    //   _this.code = n.single.code;
    //   _this.history = n.single.history;
    // });
  }
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
