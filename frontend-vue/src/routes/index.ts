import { type RouterOptions } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductsList from '@/views/ProductsList.vue'
import SingleProduct from '@/components/product/SingleProduct.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Register from '@/views/Register.vue'

const routes: RouterOptions['routes'] = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [{ path: 'register', component: Register, name: 'register' }]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home, name: 'home' },
      { path: 'products', component: ProductsList, name: 'product-list' },
      { path: 'product/:id', component: SingleProduct, name: 'product' }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

export default routes
