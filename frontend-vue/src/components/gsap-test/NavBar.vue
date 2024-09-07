<template>
  <div :class="['fixed top-10 inset-x-0 max-w-2xl mx-auto z-50', className]">
    <Menu @set-active="setActive">
      <MenuItem :active="active" item="Services" @set-active="setActive">
        <div class="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/web-dev">Web Development</HoveredLink>
          <HoveredLink href="/interface-design">Interface Design</HoveredLink>
          <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
          <HoveredLink href="/branding">Branding</HoveredLink>
        </div>
      </MenuItem>
      <MenuItem :active="active" item="Products" @set-active="setActive">
        <div class="text-sm grid grid-cols-2 gap-10 p-4">
          <ProductItem
            description="Prepare for tech interviews like never before."
            href="https://algochurn.com"
            src="https://assets.aceternity.com/demos/algochurn.webp"
            title="Algochurn"
          />
          <ProductItem
            description="Production ready Tailwind css components for your next project"
            href="https://tailwindmasterkit.com"
            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
            title="Tailwind Master Kit"
          />
          <ProductItem
            description="Never write from scratch again. Go from idea to blog in minutes."
            href="https://gomoonbeam.com"
            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
            title="Moonbeam"
          />
          <ProductItem
            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            href="https://userogue.com"
            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
            title="Rogue"
          />
        </div>
      </MenuItem>
      <MenuItem :active="active" item="Pricing" @set-active="setActive">
        <div class="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/hobby">Hobby</HoveredLink>
          <HoveredLink href="/individual">Individual</HoveredLink>
          <HoveredLink href="/team">Team</HoveredLink>
          <HoveredLink href="/enterprise">Enterprise</HoveredLink>
        </div>
      </MenuItem>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Menu from './Menu.vue'
import MenuItem from './MenuItem.vue'
import HoveredLink from './HoveredLink.vue'
import ProductItem from './ProductItem.vue'

defineProps<{
  className?: string
}>()

const active = ref<string | null>(null)

const setActive = (item: string | null) => {
  active.value = item
}
</script>

<style scoped>
/* Add any required custom styles */
</style>
