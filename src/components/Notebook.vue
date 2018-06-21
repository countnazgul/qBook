<template>
  <div class="notebook">
    <!-- <div v-for="t in arr" :key="t.data">{{t.data}}</div>  -->
    <!-- <div v-for="t1 in test" :key="(t1.data)">{{t1.data}}</div>  -->
    <!-- <button v-on:click="testtest">test</button>  -->

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
        <single-view :singleData="singleData" :appId="appId" ></single-view>
    </div>

    <div v-if="view==='multi'">
        <multi-view></multi-view>
    </div>   

    
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
      notebook: {},
      singleData: [],
      test: {}
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
    },
    testtest: function() {
      this.$store.dispatch("test").then(function(sh) {
        // _this.singleData = sh;
      });
    }
  },
  watch: {
    $route(to, from) {
      // this.show = false;
      // console.log(to.params.id);
      let _this = this;
      _this.appId = to.params.id
      _this.singleData = _this.singleGlobalData.filter(function(a) {
        return a.appId == to.params.id;
      });
    },
    singleGlobalData: function() {
      let _this = this;
      _this.singleData = _this.singleGlobalData.filter(function(a) {
        return a.appId == _this.$route.params.id;
      });
    }
  },
  mounted: function() {
    let _this = this;
    _this.appId = _this.$route.params.id;

    _this.singleData = _this.singleGlobalData.filter(function(a) {
      return a.appId == _this.$route.params.id;
    });

    // _this.$store.dispatch("getSingleHistory", _this.appId).then(function(sh) {
    //   _this.singleData = sh;
    // });

    // _this.singleData = _this.singleHistory1;
  },
  computed: {
    ...mapGetters({
      singleGlobalData: "singleHistory"
    })
    // ...mapGetters(["singleHistory1"])
    // singleGlobalData() {
    //   return this.$store.getters.singleHistory;
    // let _this = this;
    // let a = this.$store.getters.singleHistory.filter(function(a) {
    //   return a.appid == _this.$route.params.id;
    // });

    // _this.test = a;
    // return a;
  }
  // }
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
