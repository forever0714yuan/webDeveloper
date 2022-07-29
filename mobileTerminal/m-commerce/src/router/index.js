import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home/Home.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/Category/Category.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User/User.vue')
    },
    {
      path: '/cart',
      component: () => import('@/views/Cart/Cart.vue')
    },
    {
      path: '/product/:id',
      component: () => import('@/views/Product/Product.vue')
    }
  ]
})

export default router
