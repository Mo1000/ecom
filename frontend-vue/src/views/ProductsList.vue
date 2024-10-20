<template>
  <DisplayPage :is-loading="isLoading">
    <ProductsListComponent />
  </DisplayPage>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import CourseService from '@/services/course.service'

import DisplayPage from '@/components/DisplayPage.vue'
import ProductsListComponent from '@/components/product/list/ProductsListComponent.vue'
import type { CourseModel } from '@/models/course/course.model'
import { useCourseStore } from '@/stores/course.store'

const itemsPerPage = 8
const activePage = ref(1)
const { setProductsList, setTotalProducts } = useCourseStore()
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
      setProductsList(res.products as unknown as CourseModel[])
      setTotalProducts(res.total)
    } catch (e) {
      setProductsList([])
    } finally {
      isLoading.value = false
    }
  })()
})
</script>
