<template>
  <section class="w-full h-screen px-4 sm:px-6 lg:px-8 items-center grid grid-cols-2">
    <div class="hidden items-center justify-center xl:flex">
      <picture>
        <img alt="register" height="825" src="/images/auth/register.png" width="737" />
      </picture>
    </div>
    <div class="w-full xl:w-[800px]">
      <div class="flex justify-center">
        <div class="w-[400px] select-button-container"></div>
      </div>
      <div>
        <RouterView />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const path = ['Login', 'Register']
const routes = [
  {
    path: path[0],
    route: 'login'
  },
  {
    path: path[1],
    route: 'register'
  }
]

const getRoute = (path: string) => {
  return routes.find((route: any) => route.path === path)?.route
}
const value = ref(routes.find((val: any) => val.route === route.name)?.path || path[0])
const options = ref(path)
</script>
