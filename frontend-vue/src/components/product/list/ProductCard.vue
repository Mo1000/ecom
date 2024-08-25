<template>
  <div>
    <div
      class="card-icons-img h-[250px] w-[270px] bg-card flex items-center justify-center relative"
    >
      <div class="absolute right-2 top-3 space-y-3 z-10">
        <div
          class="heart-icon bg-white dark:bg-[var(--p-surface-600)] rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
          title="heart"
          v-on:click="setHeartClick"
        >
          <v-icon v-if="heartClick" class="text-red-500" name="bi-heart-fill" />
          <v-icon
            v-else
            class="text-gray-400 dark:text-[var(--p-surface-400)] hover:text-selected"
            name="bi-heart"
          />
        </div>

        <RouterLink
          :to="linkToProduct"
          class="eye-icon bg-white dark:bg-[var(--p-surface-600)] rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
        >
          <v-icon
            class="text-gray-400 dark:text-[var(--p-surface-400)] hover:text-selected"
            name="la-eye"
          />
        </RouterLink>
        <div
          class="eye-icon bg-white dark:bg-[var(--p-surface-600)] rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
          title="update"
        >
          <v-icon
            class="text-blue-500 dark:text-[var(--p-surface-400)] hover:text-selected"
            name="md-systemupdate-twotone"
          />
        </div>
        <div
          class="eye-icon bg-white dark:bg-[var(--p-surface-600)] rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
          title="delete"
          @click="handleDeleteItem"
        >
          <v-icon class="text-red-500" name="md-delete-sharp" />
        </div>
      </div>

      <div
        v-if="product.reductionPercent"
        class="reduction-price absolute left-2 top-3 rounded px-3 py-1 bg-selected text-white text-sm"
      >
        {{ product.reductionPercent }}
      </div>

      <picture class="w-2/3 hover:opacity-75">
        <img :src="optimizeUrl(product.image).toURL()" alt="card product" />
      </picture>

      <div
        class="add-to-card-section absolute cursor-pointer bottom-0 hidden w-full h-11 bg-black text-white text-xl hover:text-red-100 justify-center items-center gap-3"
      >
        <v-icon class="text-white" name="md-addshoppingcart" />
        <span> Add To Cart</span>
      </div>
    </div>
    <div class="text-price-Container space-y-3 my-4">
      <div class="text-card text-base">{{ product.title }}</div>
      <div class="flex gap-3">
        <span class="final-price-card text-red-500"> {{ product.finalPrice }} </span>
        <span class="previous-price-card line-through text-gray-400">
          {{ product.previousPrice }}
        </span>
      </div>
      <div class="star-container flex gap-2">
        <picture v-if="product?.stars" class="flex gap-2">
          <Rating v-model="product.stars.total" :stars="5" readonly />
          <!--          <img-->
          <!--            v-for="star in Array.from({ length: product.stars.total })"-->
          <!--            :key="star"-->
          <!--            alt="card product"-->
          <!--            height="20"-->
          <!--            src="/images/product/star.png"-->
          <!--            width="20"-->
          <!--          />-->
        </picture>
        <span v-if="product.stars?.number" class="text-gray-400">
          ({{ product.stars.number }})
        </span>
      </div>

      <div
        v-if="product?.sizeList && product.sizeList.length > 0"
        class="color-list flex gap-2 items-center"
      >
        <div
          v-for="(size, index) in product.sizeList"
          :key="index"
          class="rounded-md px-2 py-1 hover:ring-1 dark:bg-[var(--p-surface-600)] ring-black cursor-pointer shadow-md"
        >
          {{ size }}
        </div>
      </div>
      <div
        v-if="product?.colorList && product.colorList.length > 0"
        class="color-list flex gap-3 items-center"
      >
        <div
          v-for="(color, index) in product.colorList"
          :key="index"
          :style="{
            borderColor: color
            //backgroundColor: color
          }"
          class="border dark:opacity-80 relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
        >
          <span
            :style="{
              backgroundColor: color
            }"
            aria-hidden="true"
            class="h-6 w-6 rounded-full border border-black border-opacity-10"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, toRefs } from 'vue'
import type { ProductModel } from '@/models/product.model'
import { ToastInjectionKey } from '@/constants/injectionKey'
import { SwalCustom } from '@/utils/swalUtils'
import ProductService from '@/services/product.service'
import { optimizeUrl } from '@/utils'
import { useProductStore } from '@/store/product.store'

const toastProvider = inject(ToastInjectionKey)
const props = defineProps<Props>()
const { product } = toRefs(props)

interface Props {
  product: ProductModel
}

const { setProductsList } = useProductStore()

const heartClick = ref(false)

function setHeartClick() {
  heartClick.value = !heartClick.value
}

const handleDeleteItem = async () => {
  const request = async () => {
    try {
      await ProductService.deleteProduct(product.value.objectId)
      setProductsList((prev) => {
        return prev.filter((item) => item.objectId != product.value.objectId)
      })
      toastProvider?.showToast('Delete successfully', {
        severity: 'success'
      })
    } catch (e) {
      toastProvider?.showToast('Delete failed', {
        severity: 'error'
      })
    }
  }

  await SwalCustom.fire({
    html: `<div >
                Are you sure you want to remove<span class="text-blue-500"> ${product.value?.title} </span></div>`,
    showDenyButton: true,
    icon: 'warning',
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !SwalCustom.isLoading(),
    preConfirm: request
  })
}
const linkToProduct = computed(() => {
  return {
    name: 'product',
    params: {
      id: product.value.objectId
    }
  }
})
</script>
