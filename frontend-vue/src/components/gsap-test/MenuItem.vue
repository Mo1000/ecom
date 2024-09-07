<template>
  <div class="relative" @mouseenter="() => emit('set-active', item)">
    <p class="cursor-pointer text-black hover:opacity-[0.9] dark:text-white">
      {{ item }}
    </p>
    <div v-if="active !== null" ref="dropDownContainer">
      <div v-if="active === item" ref="dropdown">
        <div class="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
          <div
            class="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
          >
            <div class="w-max h-full p-4">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { gsap } from 'gsap' // Define props

// Define props
interface Props {
  item: string
  active: string | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'set-active', item: string | null): void
}>()
const dropDownContainer = ref<HTMLDivElement | null>(null)
const dropdown = ref<HTMLDivElement | null>(null)
const springTransition = {
  duration: 0.6,
  ease: 'power2.inOut' // Mimicking spring by using elastic ease
}
watchEffect(() => {
  if (props.active !== null) {
    if (dropDownContainer.value) {
      gsap.fromTo(
        dropDownContainer.value,
        { opacity: 0, scale: 0.85, y: 10 },
        { opacity: 1, scale: 1, y: 0, ...springTransition }
      )
      if (props.active === props.item) {
        animateDropdown()
      }
    }
  }
})

const animateDropdown = () => {
  if (dropdown.value) {
    gsap.to(
      dropdown.value,
      { ...springTransition }
      // { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.inOut' }
    )
  }
}
</script>

<style scoped>
/* Add any required custom styles */
</style>
