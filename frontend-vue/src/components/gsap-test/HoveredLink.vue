<template>
  <RouterLink :to="href" class="text-neutral-700 dark:text-neutral-200 hover:text-black">
    <slot></slot>
  </RouterLink>
</template>

<script lang="ts" setup>
defineProps<{
  href: string
}>()
</script>

<style scoped>
/* Add any required custom styles */
</style>
