<template>
  <div id="app">
    <img v-if="!loaded" src="gears.gif" vspace="50">
      <header>
        qBook
        <span v-on:click="goHome" class="lui-icon  lui-icon--home cursor" aria-hidden="true" title="Home"></span>
      </header>
      <main>        
    <router-view/>
    <notifications group="foo" position="top left" />
      </main>    
  </div>
</template>

<script>
export default {
  name: "Main",
  props: {},
  data() {
    return {
      loaded: false
    };
  },
  methods: {
    goHome: function() {
      let _this = this;
      _this.$router.push({
        name: "select"
      });
    }
  },
  mounted: function() {
    let _this = this;

    _this.$store.dispatch("setDocuments").then(function(documents) {
      _this.loaded = true;

      if (!_this.$route.params.id) {
        _this.$router.push({
          name: "select"
        });
      }
    });
  }
};
</script>

<style>
#app {
  font-family: "QlikView Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 2vw 30vw;
  grid-gap: 1em;
}

.cursor {
  cursor: pointer;
}

@font-face {
  font-family: "LUI icons";
  src: url(assets/lui-icons.woff) format("woff"),
    url(assets/lui-icons.ttf) format("truetype");
}

@font-face {
  font-family: "QlikView Sans";
  src: url(assets/qlikview-sans.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
}

.CodeMirror {
  height: 100px !important;
  min-height: 100px !important;
  max-height: 100px !important;
}
</style>
