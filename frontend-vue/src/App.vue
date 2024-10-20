<template>
  <main class="max-w-[90rem] mx-auto"><Toast /><RouterView /></main>
</template>

<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import { provide } from 'vue'
import type { ToastMessageOptions } from 'primevue/toast'
import { ToastInjectionKey } from '@/constants/injectionKey'

const toast = useToast()
type ToastType = Omit<ToastMessageOptions, 'detail'>

const showToast = (message: string, data: ToastType) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 5000,
    ...data
  })
}

provide(ToastInjectionKey, { showToast })
</script>
