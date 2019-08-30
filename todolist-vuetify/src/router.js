import Vue from 'vue'
import Router from 'vue-router'
import TodoList from './views/TodoList.vue'
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
