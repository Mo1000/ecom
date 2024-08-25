<template>
  <div :class="['flex justify-center items-center mt-10  h-[80vh]  w-full', className]">
    <h1 class="text-2xl md:text-3xl font-bold">{{ text }}</h1>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  text: string
  className?: string
}
defineProps<Props>()
</script>
