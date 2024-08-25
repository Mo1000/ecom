<template>
  <Toast />
  <Header />
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><RouterView /></section>

  <Footer />
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
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
