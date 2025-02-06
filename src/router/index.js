import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue'),
    },
  ],
  scrollBehavior() {
      return { top: 0, left: 0 }
    }  
})

export default router
