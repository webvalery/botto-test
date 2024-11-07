import { createRouter, createWebHistory } from 'vue-router'

import MortgageCalculator from '@/views/Mortgage/App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MortgageCalculator',
      component: MortgageCalculator,
    },
  ]
})

export default router
