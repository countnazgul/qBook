import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCodemirror from 'vue-codemirror'
import UUID from 'vue-uuid'
import Notifications from 'vue-notification'
// import VueRamda from 'vue-ramda'

import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime';

Vue.use(UUID)
Vue.use(Notifications)
// Vue.use(VueRamda)

// you can set default global options and events when use
Vue.use(VueCodemirror, /* { 
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

// require('codemirror/addon/selection/active-line.js')
// require('codemirror/addon/selection/mark-selection.js')
// require('codemirror/addon/search/match-highlighter.js')
// require('codemirror/addon/edit/matchbrackets.js')
// require('codemirror/addon/display/fullscreen.js')
// require('codemirror/addon/display/placeholder.js')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
