import { defineStore } from 'pinia'
import type { ProductModel } from '@/models/product.model'
import { readonly, ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const productsList = ref<ProductModel[]>([])
  const totalProducts = ref(0)

  // Define overloads for the setProductList function
  function setProductsList(newProducts: ProductModel[]): void
  function setProductsList(callback: (prev: ProductModel[]) => ProductModel[]): void

  // Implement the function
  function setProductsList(arg: ProductModel[] | ((prev: ProductModel[]) => ProductModel[])) {
    if (typeof arg === 'function') {
      // If a callback is provided, use it with the current value of productsList
      productsList.value = arg(productsList.value)
    } else {
      // If a new product list is provided directly, set it
      productsList.value = arg
    }
  }

  const setTotalProducts = (total: number) => {
    totalProducts.value = total
  }

  return {
    productsList: readonly(productsList),
    totalProducts: readonly(totalProducts),
    setProductsList,
    setTotalProducts
  }
})
