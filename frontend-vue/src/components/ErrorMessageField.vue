<template>
  <div>
    <div
      v-if="error && error.length > 0"
      class="mt-2 text-sm font-semibold text-red-400 xl:text-base xl:font-normal"
    >
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  error: string | undefined
}
defineProps<Props>()
</script>
