<template>
  <div
    v-if="isProductsListNotEmpty"
    class="gap-y-12 my-5 w-full grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 md:gap-x-20 md:gap-y-16"
  >
    <div
      v-for="(product, index) in store.productsList"
      :key="index"
      :class="getProductClass(index)"
    >
      <ProductCard :product="product as ProductModel" />
    </div>
  </div>
  <ElementNotFound v-else text="No products found" />
</template>

<script lang="ts" setup>
import ProductCard from '@/components/product/list/ProductCard.vue'
import ElementNotFound from '@/components/ElementNotFound.vue'
import { useProductStore } from '@/store/product.store'
import { computed } from 'vue'
import type { ProductModel } from '@/models/product.model'

const store = useProductStore()
const isProductsListNotEmpty = computed(() => store.productsList.length > 0)

// Function to determine the class based on the item's position
const getProductClass = (index: number) => {
  const positionInRow = index % 3
  if (positionInRow === 0) return 'xl:justify-self-start' // First in the row
  if (positionInRow === 1) return 'xl:justify-self-center' // Middle in the row
  return 'xl:justify-self-end' // Last in the row
}
</script>
