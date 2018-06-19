<template>
  <div class="section">   
    <div>
      <span @click="addTab" class="lui-icon lui-icon--add add-tab" aria-hidden="true" title="Add Tab"></span>
      <span @click="removeSection" class="lui-icon lui-icon--minus add-tab" aria-hidden="true" title="Remove This Section"></span>
      <span @click="test" class="lui-icon lui-icon--auto-layout" aria-hidden="true" title="Remove This Section"></span>
    </div>
    <ul class="lui-tabset lui-tabset--fill1" style="border: 1px solid rgba(0, 0, 0, 0.1);">
      <li v-for="data in notebookData.data" :key="data.id" @click="tabClick(data)" :class="['lui-tab', { 'lui-active': activeId == data.id }]" :title="data.title" >
        <span class="lui-icon lui-icon--triangle-left" @click.stop="moveTab(data, -1)" title="Move tab to the left"></span>
        <span class="lui-tab__text">{{data.title}}</span>
        <span class="lui-tab__aside">
            <!-- <span class="lui-icon lui-icon--play" @click.stop="removeTab(data)" title="Calculate (Ctrl + Enter)"></span> -->
            <span class="lui-icon lui-icon--close" @click.stop="removeTab(data)" title="Remove (Ctrl + Del)"></span>
        </span>
        <span class="lui-icon lui-icon--triangle-right" @click.stop="moveTab(data, 1)" title="Move tab to the right"></span>
        <!-- <span class="lui-tab__aside lui-icon lui-icon--close"></span> -->
      </li>
    </ul>
  
    <codemirror 
      v-model="activeCode" 
      :options="cmOption"         
      @ready="onEditorReady"
      class="editor">
    </codemirror>

    <div class="section-history-component history">
      <history 
        v-for="historyData in notebookData.history"
        :key="historyData.id"
        :historyData="historyData" 
        class=""
        @removeHistory="removeHistory"
      ></history>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import { uuid } from "vue-uuid";
import History from "../History.vue";

export default {
  name: "Section",
  props: ["notebookData"],
  components: {
    codemirror,
    History
  },
  data() {
    return {
      activeId: "",
      activeCode: "",
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
    tabClick: function(tab) {
      let _this = this;
      _this.activeId = tab.id;
      _this.activeCode = tab.code;
    },
    removeTab: function(tab) {
      let _this = this;
      _this.notebookData.data = _this.notebookData.data.filter(function(t) {
        return t.id != tab.id;
      });

      if (_this.notebookData.data.length == 0) {
        _this.notebookData.data.push({
          id: 0,
          code: "Empty code",
          title: "Expression"
        });
        _this.activeId = _this.notebookData.data[0].id;
        _this.activeCode = _this.notebookData.data[0].code;
      } else if (tab.id == _this.activeId) {
        _this.activeId = _this.notebookData.data[0].id;
        _this.activeCode = _this.notebookData.data[0].code;
      }
    },
    addTab: function() {
      let _this = this;
      let newTab = {
        id: _this.$uuid.v4(),
        code: "Empty code",
        title:
          "ExpressionExpressionExpressionExpressionExpressionExpressionExpression"
      };
      _this.notebookData.data.push(newTab);

      _this.activeId = newTab.id;
      _this.activeCode = newTab.code;
    },
    moveTab: function(element, delta) {
      let _this = this;
      //   var move = function(array, element, delta) {
      var index = _this.notebookData.data.indexOf(element);
      var newIndex = index + delta;
      if (newIndex < 0 || newIndex == _this.notebookData.data.length) return; //Already at the top or bottom.
      var indexes = [index, newIndex].sort(); //Sort the indixes
      _this.notebookData.data.splice(
        indexes[0],
        2,
        _this.notebookData.data[indexes[1]],
        _this.notebookData.data[indexes[0]]
      ); //Replace from lowest index, two elements, reverting the order
      //   };
    },
    removeSection: function() {
      let _this = this;
      _this.$emit("removeSection", _this.notebookData);
    },
    removeHistory: function(historyRec) {
      let _this = this

      _this.notebookData.history = _this.notebookData.history.filter(function(h) {
        return h.id != historyRec.id
      })

    },
    test: function() {
      this.$notify({
        group: "foo",
        title: "Important message",
        text: "Hello user! This is a notification!"
      });
    },
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
    }
  },
  mounted: function() {
    let _this = this;
    _this.activeId = _this.notebookData.data[0].id;
    _this.activeCode = _this.notebookData.data[0].code;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  display: grid;
  grid-template-columns: 20px auto;
  grid-template-rows: 50px 50px 50px;
  grid-gap: 0px;
}

.editor {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: span 2;
}

.add-tab {
  justify-self: center;
  cursor: pointer;
}

.section-history-component {
  grid-column-start: 1;
  grid-column-end: span 2;
  grid-row-start: 4;
  /* grid-row-end: span 3; */
}

.history {
  display: grid;
  grid-template-columns: auto;
  /* grid-template-rows: 2vw 30vw; */
  grid-gap: 1px;
}
</style>
