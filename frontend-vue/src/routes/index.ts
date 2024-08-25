import { type RouterOptions } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductsList from '@/views/ProductsList.vue'
import SingleProduct from '@/components/product/SingleProduct.vue'

const routes: RouterOptions['routes'] = [
  { path: '/', component: Home },
  { path: '/products', component: ProductsList },
  { path: '/product/:id', component: SingleProduct }
]

export default routes
