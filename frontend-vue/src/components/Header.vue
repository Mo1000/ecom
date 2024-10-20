<template>
  <section class="layout-topbar layout-topbar-sticky">
    <!-- Mobile menu -->
    <TransitionRoot :show="mobileMenuOpen" as="template">
      <Dialog class="relative z-40 lg:hidden" @close="mobileMenuOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-project pb-12 shadow-xl"
            >
              <div class="flex px-4 pb-2 pt-5">
                <button
                  class="-m-2 inline-flex items-center justify-center rounded-md p-2"
                  type="button"
                  @click="mobileMenuOpen = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" class="h-6 w-6" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab
                      v-for="category in navigation.categories"
                      :key="category.name"
                      v-slot="{ selected }"
                      as="template"
                    >
                      <button
                        :class="[
                          selected ? 'border-selected text-selected' : 'border-transparent ',
                          'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium hover:text-primary-600'
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel
                    v-for="category in navigation.categories"
                    :key="category.name"
                    class="space-y-12 px-4 py-6 transform -translate-x-1/2"
                  >
                    <div class="grid grid-cols-2 gap-x-4 gap-y-10">
                      <div
                        v-for="item in category.featured"
                        :key="item.name"
                        class="group relative"
                      >
                        <div
                          class="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75"
                        >
                          <img
                            :alt="item.imageAlt"
                            :src="item.imageSrc"
                            class="object-cover object-center"
                          />
                        </div>
                        <RouterLink :to="item.href" class="mt-6 block text-sm font-medium">
                          <span aria-hidden="true" class="absolute inset-0 z-10" />
                          {{ item.name }}
                        </RouterLink>
                        <p aria-hidden="true" class="mt-1 text-sm">Shop now</p>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <RouterLink
                    :to="page.href"
                    class="-m-2 block p-2 font-medium hover:text-primary-600"
                    >{{ page.name }}</RouterLink
                  >
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <RouterLink
                    :to="{ name: 'register' }"
                    class="-m-2 block p-2 font-medium hover:text-selected hover:text-primary-600"
                    >Create an account</RouterLink
                  >
                </div>
                <div class="flow-root">
                  <RouterLink
                    class="-m-2 block p-2 font-medium hover:text-selected hover:text-primary-600"
                    to="/"
                    >Sign in</RouterLink
                  >
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <!-- Currency selector -->
                <form>
                  <div class="inline-block">
                    <label class="sr-only" for="mobile-currency">Currency</label>
                    <div
                      class="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white"
                    >
                      <select
                        id="mobile-currency"
                        class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium focus:border-transparent focus:outline-none focus:ring-0"
                        name="currency"
                      >
                        <option v-for="currency in currencies" :key="currency">
                          {{ currency }}
                        </option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                        <ChevronDownIcon aria-hidden="true" class="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <header class="relative z-10">
      <nav aria-label="Top">
        <!-- Top navigation -->
        <div class="bg-gray-900">
          <div
            class="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          >
            <!-- Currency selector -->
            <form>
              <div>
                <label class="sr-only" for="desktop-currency">Currency</label>
                <div
                  class="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white"
                >
                  <select
                    id="desktop-currency"
                    class="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm text-white font-medium focus:border-transparent focus:outline-none focus:ring-0"
                    name="currency"
                  >
                    <option v-for="currency in currencies" :key="currency">{{ currency }}</option>
                  </select>
                </div>
              </div>
            </form>

            <div class="flex items-center space-x-6 text-white">
              <RouterLink class="text-sm font-medium hover:text-selected" to="#"
                >Sign in</RouterLink
              >
              <RouterLink :to="{ name: 'register' }" class="text-sm font-medium hover:text-selected"
                >Create an account</RouterLink
              >
            </div>
          </div>
        </div>

        <!-- Secondary navigation -->
        <div class="backdrop-blur-md backdrop-filter">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <div class="flex h-16 items-center justify-between">
                <!-- Logo (lg+) -->
                <div class="hidden lg:flex lg:flex-1 lg:items-center">
                  <RouterLink to="/">
                    <span class="sr-only">Your Company</span>
                    <img
                      alt=""
                      class="h-8 w-auto dark:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=blue"
                    />
                    <img
                      alt=""
                      class="h-8 w-auto hidden dark:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    />
                  </RouterLink>
                </div>

                <div class="hidden h-full lg:flex">
                  <!-- Flyout menus -->
                  <PopoverGroup class="inset-x-0 bottom-0 px-4">
                    <div class="flex h-full justify-center space-x-8">
                      <Popover
                        v-for="category in navigation.categories"
                        :key="category.name"
                        v-slot="{ open }"
                        class="flex"
                      >
                        <div class="relative flex">
                          <PopoverButton
                            :class="[
                              open ? 'text-selected' : '',
                              'relative z-10  hover:text-primary-600 flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out'
                            ]"
                          >
                            {{ category.name }}
                            <span
                              :class="[
                                open ? 'bg-selected' : '',
                                'absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out'
                              ]"
                              aria-hidden="true"
                            />
                          </PopoverButton>
                        </div>

                        <transition
                          enter-active-class="transition ease-out duration-200"
                          enter-from-class="opacity-0"
                          enter-to-class="opacity-100"
                          leave-active-class="transition ease-in duration-150"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <PopoverPanel class="absolute inset-x-0 top-full text-sm">
                            <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                            <div
                              aria-hidden="true"
                              class="absolute inset-0 top-1/2 bg-white shadow"
                            />

                            <div class="relative bg-project">
                              <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div class="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                  <div
                                    v-for="item in category.featured"
                                    :key="item.name"
                                    class="group relative"
                                  >
                                    <div
                                      class="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75"
                                    >
                                      <img
                                        :alt="item.imageAlt"
                                        :src="item.imageSrc"
                                        class="object-cover object-center"
                                      />
                                    </div>
                                    <a :href="item.href" class="mt-4 block font-medium">
                                      <span aria-hidden="true" class="absolute inset-0 z-10" />
                                      {{ item.name }}
                                    </a>
                                    <p aria-hidden="true" class="mt-1">Shop now</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </transition>
                      </Popover>

                      <a
                        v-for="page in navigation.pages"
                        :key="page.name"
                        :href="page.href"
                        class="flex items-center text-sm font-medium hover:text-primary-600"
                        >{{ page.name }}</a
                      >
                    </div>
                  </PopoverGroup>
                </div>

                <!-- Mobile menu and search (lg-) -->
                <div class="flex flex-1 items-center lg:hidden">
                  <button class="-ml-2 p-2" type="button" @click="mobileMenuOpen = true">
                    <span class="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" class="h-6 w-6" />
                  </button>

                  <!-- Search -->
                  <a class="ml-2 p-2" href="#">
                    <span class="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" class="h-6 w-6" />
                  </a>
                </div>

                <!-- Logo (lg-) -->
                <RouterLink class="lg:hidden" to="/">
                  <span class="sr-only">Your Company</span>
                  <img
                    alt=""
                    class="h-8 w-auto dark:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=blue"
                  />
                  <img
                    alt=""
                    class="h-8 w-auto hidden dark:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                  />
                </RouterLink>

                <div class="flex flex-1 items-center justify-end">
                  <a class="hidden text-sm font-medium lg:block hover:text-primary-600" href="#"
                    >Search</a
                  >

                  <div class="flex items-center lg:ml-8">
                    <!-- Help -->
                    <a class="p-2 lg:hidden" href="#">
                      <span class="sr-only">Help</span>
                      <QuestionMarkCircleIcon aria-hidden="true" class="h-6 w-6" />
                    </a>
                    <a class="hidden text-sm font-medium lg:block hover:text-primary-600" href="#"
                      >Help</a
                    >

                    <!-- Cart -->
                    <div class="ml-4 flow-root lg:ml-8">
                      <a class="group -m-2 flex items-center p-2" href="#">
                        <ShoppingBagIcon
                          aria-hidden="true"
                          class="h-6 w-6 flex-shrink-0 hover:text-primary-600"
                        />
                        <span class="ml-2 text-sm font-medium">0</span>
                        <span class="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </section>
</template>
<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.'
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.'
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.'
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.'
        }
      ]
    },
    {
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt:
            'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.'
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.'
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.'
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
          imageAlt:
            'Model putting folded cash into slim card holder olive leather wallet with hand stitching.'
        }
      ]
    }
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' }
  ]
}
</script>

<style scoped></style>
