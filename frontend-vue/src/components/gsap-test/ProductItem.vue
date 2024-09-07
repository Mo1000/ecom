<template>
  <router-link :to="href" class="flex space-x-2">
    <img
      :alt="title"
      :src="src"
      class="flex-shrink-0 rounded-md shadow-2xl"
      height="70"
      width="140"
    />
    <div>
      <h4 class="text-xl font-bold mb-1 text-black dark:text-white">
        {{ title }}
      </h4>
      <p class="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
        {{ description }}
      </p>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  href: string
  src: string
}>()
</script>

<style scoped>
/* Add any required custom styles */
</style>
