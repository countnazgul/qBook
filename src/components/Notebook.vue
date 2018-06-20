<template>
  <div class="notebook">
    <div class="lui-search lui-search--inverse">
      <span class="lui-icon  lui-icon--search  lui-search__search-icon"></span>
      <input class="lui-search__input" maxlength="255" spellcheck="false" type="text" placeholder="Selections bar placeholder"/>
      <button class="lui-search__clear-button">
        <span class="lui-icon  lui-icon--small  lui-icon--close"></span>
      </button>
    </div>
    <ul class="lui-tabset lui-tabset--fill" style="border: 1px solid rgba(0, 0, 0, 0.1);">
      <li v-on:click="changeView('single')" :class="['lui-tab', { 'lui-active': view == 'single' }]">
          <span class="lui-tab__text">Single View</span>
      </li>
      <li v-on:click="changeView('multi')" :class="['lui-tab', { 'lui-active': view == 'multi' }]">
          <span class="lui-tab__text">Multi View</span>
          <span class="lui-tab__aside lui-icon"></span>
      </li>
      <li v-on:click="changeView('data')" :class="['lui-tab', 'lui-disabled', { 'lui-active': view == 'data' }]">
          <span class="lui-tab__text">Data View</span>
      </li>
    </ul>

    <div v-if="view==='single'">
        <single-view :singleData="notebook.single" :appId="notebook.appId"></single-view>
    </div>

    <div v-if="view==='multi'">
        <multi-view></multi-view>
    </div>    
  </div>
</template>

<script>
import SingleView from "./Notebook/SingleView.vue";
import MultiView from "./Notebook/MultiView/MultiView.vue";

export default {
  name: "Notebook",
  components: {
    SingleView,
    MultiView
  },
  props: {},
  data() {
    return {
      appId: "",
      view: "single",
      notebook: {}
    };
  },
  methods: {
    changeView: function(type) {
      let _this = this;

      _this.view = type;
      // _this.$router.push({
      //   name: "select"
      // });

      // _this.$router.push({
      //   query: Object.assign({}, this.$route.query, { section: type })
      // });
    }
  },
  mounted: function() {
    let _this = this;
    _this.appId = _this.$route.params.id;

    _this.$store.dispatch("getNotebook", _this.appId).then(function(n) {
      // console.log(n)
      _this.notebook = n
    });

    // if (_this.$route.params.section) {
    //   _this.view = _this.$route.params.section;
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notebook {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 2vw 2vw 30vw;
  grid-gap: 5px;
}

.lui-search--inverse {
  background-color: #404040;
  color: #ffffff;
}
</style>
