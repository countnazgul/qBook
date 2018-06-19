<template>
  <div class="single">
      <codemirror 
        v-model="code" 
        :options="cmOption" 
        @ready="onEditorReady"
        class="editor">
      </codemirror>
      <div class="result">{{result.value}}</div>
      <div class="history">History
          <div v-for="hResult in history" :key="hResult.code">{{hResult.value}}</div>
      </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import { uuid } from 'vue-uuid'

export default {
  name: "SingleView",
  props: {},
  components: {
    codemirror
  },
  data() {
    return {
      appId: "",
      code: "1231 asd",
      result: {code: '', evaluated: '', value: ''},
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
    calculateExpression: function() {
        let _this = this
        let result = {
            code: _this.code,
            evaluated: _this.code,
            value: new Date()
        }

        _this.result = result
        _this.history.unshift(result)
    }
  },
  mounted: function() {}
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
