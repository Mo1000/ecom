<template>
  <div v-if="isLoading">
    <Loader />
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import Loader from '@/components/Loader.vue'

interface Props {
  isLoading: boolean
}
defineProps<Props>()
</script>

<style scoped></style>
