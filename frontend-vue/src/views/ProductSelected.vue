<template>
  <DisplayPage :is-loading="isLoading">
    <SingleProduct :product-selected="productSelected as ProductSelectedModel" />
  </DisplayPage>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import type { ProductModel } from '@/models/product.model'
import ProductService from '@/services/product.service'
import DisplayPage from '@/components/DisplayPage.vue'
import SingleProduct from '@/components/product/SingleProduct.vue'

type ProductSelectedModel = ProductModel | null
const route = useRoute()
const objectId = route.params.id?.toString() || ''
const productSelected = ref<ProductSelectedModel>(null)
const isLoading = ref(true)

async function fetchProduct() {
  try {
    isLoading.value = true
    productSelected.value = await ProductService.getProductById(objectId)
  } catch (e) {
    productSelected.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})

watch(
  () => route.params.id,
  () => {
    fetchProduct()
  }
)
</script>
