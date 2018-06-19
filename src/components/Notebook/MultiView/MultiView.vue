<template>
  <div class="multi">
    <div>
    <span @click="addSection" class="lui-icon lui-icon--add add-section" aria-hidden="true" title="Add Section"></span>
    <span @click="removeAllSections" class="lui-icon lui-icon--remove add-section" aria-hidden="true" title="Remove All Sections"></span>
    </div>
    <Section 
      v-for="notebook in notebooks" 
      :notebookData="notebook" 
      :key="notebook.id"
      @removeSection="removeSection"
    ></Section>
  </div>
</template>

<script>
import Section from "./Section.vue";
// import { codemirror } from "vue-codemirror";
// import "codemirror/lib/codemirror.css";
import { uuid } from "vue-uuid";

export default {
  name: "MultiView",
  props: {},
  components: {
    Section
  },
  data() {
    return {
      activeId: "",
      notebooks: [
        {
          id: 1,
          history: [
            {
              id: 123,
              code: 'sum( $(test) )',
              codeEvaluated: 'sum( 123 )',
              timeStamp: '2018-06-19 13:10:11',
              result: '123'
            },
            {
              id: 456,
              code: 'sum( $(test1) )',
              codeEvaluated: 'sum( 456 )',
              timeStamp: '2018-06-19 14:10:11',
              result: '456'
            },
            {
              id: 789,
              code: 'sum( $(test2) )',
              codeEvaluated: 'sum( 789 )',
              timeStamp: '2018-06-19 15:10:11',
              result: '789'
            }                        
          ],
          data: [
            {
              id: 1,
              title: "title 1",
              code: "code 1"
            },
            {
              id: 2,
              title: "title 2",
              code: "code 2"
            },
            {
              id: 3,
              title: "title 3",
              code: "code 3"
            }
          ]
        }
      ]
    };
  },
  methods: {
    addSection: function() {
      let _this = this;
      let newSection = {
        id: _this.$uuid.v4(),
        history: [],
        data: [
          {
            id: 1,
            title: "title 1",
            code: "code 1"
          }
        ]
      };

      _this.notebooks.push(newSection);
    },
    removeSection: function(section) {
      let _this = this;

      _this.notebooks = _this.notebooks.filter(function(n) {
        return n.id != section.id;
      });

      if (_this.notebooks.length == 0) {
        let newNotebook = {
          id: _this.$uuid.v4(),
          history: [],
          data: [
            {
              id: _this.$uuid.v4(),
              code: "Empty code",
              title: "Expression"
            }
          ]
        };

        _this.notebooks.push(newNotebook);
      }
    },
    removeAllSections: function() {
      let _this = this;

      let newNotebook = [
        {
          id: _this.$uuid.v4(),
          history: [],
          data: [
            {
              id: _this.$uuid.v4(),
              code: "Empty code",
              title: "Expression"
            }
          ]
        }
      ];

      _this.notebooks = newNotebook;
    }
  },
  mounted: function() {
    let _this = this;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.multi {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20px;
  grid-gap: 1em;
}

.editor {
  grid-row-start: 1;
}

.add-section {
  cursor: pointer;
  padding-right: 5px;
}
</style>
