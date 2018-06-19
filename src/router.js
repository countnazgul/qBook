import Vue from 'vue'
import Router from 'vue-router'
import Select from './views/Select.vue'
import About from './views/About.vue'
import Notebook from './views/Notebook.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/select',
      name: 'select',
      component: Select
    },
    {
      path: '/app/:id/:section?',
      name: 'app',
      component: Notebook
    },    
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
