<template>
  <DisplayPage :is-loading="isLoading">
    <ProductsListComponent />
  </DisplayPage>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import CourseService from '@/services/course.service'
import type { ProductModel } from '@/models/product.model'
import { useProductStore } from '@/store/product.store'
import DisplayPage from '@/components/DisplayPage.vue'
import ProductsListComponent from '@/components/product/list/ProductsListComponent.vue'

const itemsPerPage = 8
const activePage = ref(1)
const { setProductsList, setTotalProducts } = useProductStore()
const isLoading = ref(true)
onMounted(() => {
  ;(async () => {
    try {
      isLoading.value = true
      const skip = (activePage.value - 1) * itemsPerPage

      const res = await CourseService.getProductsByAny({
        limit: itemsPerPage,
        skip
      })
      setProductsList(res.products as unknown as ProductModel[])
      setTotalProducts(res.total)
    } catch (e) {
      setProductsList([])
    } finally {
      isLoading.value = false
    }
  })()
})
</script>
