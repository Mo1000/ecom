<template>
  <Header />
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><RouterView /></section>
  <Footer />
</template>
<script lang="ts" setup>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
</script>
