<template>
  <footer aria-labelledby="footer-heading" class="bg-surface-100 dark:bg-surface-800 shadow">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="grid grid-cols-2 gap-8 xl:col-span-2">
          <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            <div>
              <h3 class="text-sm font-medium">Shop</h3>
              <ul class="mt-6 space-y-6" role="list">
                <li v-for="item in footerNavigation.shop" :key="item.name" class="text-sm">
                  <a :href="item.href" class="hover:text-surface-800">{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-sm font-medium">Company</h3>
              <ul class="mt-6 space-y-6" role="list">
                <li v-for="item in footerNavigation.company" :key="item.name" class="text-sm">
                  <a :href="item.href" class="hover:text-surface-800">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            <div>
              <h3 class="text-sm font-medium">Account</h3>
              <ul class="mt-6 space-y-6" role="list">
                <li v-for="item in footerNavigation.account" :key="item.name" class="text-sm">
                  <a :href="item.href" class="hover:text-surface-800">{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-sm font-medium">Connect</h3>
              <ul class="mt-6 space-y-6" role="list">
                <li v-for="item in footerNavigation.connect" :key="item.name" class="text-sm">
                  <a :href="item.href" class="hover:text-surface-800">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-12 md:mt-16 xl:mt-0">
          <h3 class="text-sm font-medium">Sign up for our newsletter</h3>
          <p class="mt-6 text-sm">The latest deals and savings, sent to your inbox weekly.</p>
          <form class="mt-5 flex sm:max-w-md">
            <label class="sr-only" for="email-address">Email address</label>
            <input
              id="email-address"
              :required="true"
              autocomplete="email"
              class="w-full min-w-0 appearance-none rounded-md shadow-surface-300 bg-gray-100 dark:bg-surface-500 px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none dark:text-white"
              type="text"
            />
            <div class="ml-4 flex-shrink-0">
              <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-selected px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="border-t border-gray-800 py-10">
        <p class="text-sm text-gray-400">Copyright &copy; 2021 Your Company, Inc.</p>
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>
const footerNavigation = {
  shop: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' }
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' }
  ],
  account: [
    { name: 'Manage Account', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Redeem a Gift Card', href: '#' }
  ],
  connect: [
    { name: 'Contact Us', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' }
  ]
}
</script>

<style scoped></style>
