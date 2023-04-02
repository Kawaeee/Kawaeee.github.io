import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // Lazy-loaded
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      // Lazy-loaded
      path: '/exp',
      name: 'experiences',
      component: () => import('../views/ExperienceView.vue')
    },
    {
      // Lazy-loaded
      path: '/proj',
      name: 'projects',
      component: () => import('../views/ProjectView.vue')
    }
  ]
})

export default router
