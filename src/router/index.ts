import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import a from '@/views/a.vue'
import b from '@/views/b.vue'
import c from '@/views/c.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/a',
      component: a
    },
    {
      path: '/b',
      component: b
    },
    {
      path: '/c',
      component: c
    }
  ]
})

export default router
