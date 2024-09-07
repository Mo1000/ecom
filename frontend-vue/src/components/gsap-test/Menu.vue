<template>
  <nav
    class="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    @mouseleave="resetActive"
  >
    <slot :set-active="setActive" />
  </nav>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue'

// Define the emit function to send events to parent components
const emit = defineEmits(['set-active'])

// Ref to store the currently active item
const activeItem = ref<string | null>(null)

// Function to set the active item
const setActive = (item: string | null) => {
  activeItem.value = item
  emit('set-active', item) // Emit event to notify parent component
}

// Function to reset the active item when mouse leaves
const resetActive = () => {
  setActive(null)
}
</script>

<style scoped>
/* Add any required custom styles */
</style>
