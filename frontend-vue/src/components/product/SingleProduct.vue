<template>
  <main class="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
    <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
      <div class="lg:col-span-5 lg:col-start-8">
        <div class="flex justify-between">
          <h1 class="text-xl font-medium">{{ product.name }}</h1>
          <p class="text-xl font-medium">{{ product.price }}</p>
        </div>
        <!-- Reviews -->
        <div class="mt-4">
          <h2 class="sr-only">Reviews</h2>
          <div class="flex items-center">
            <p class="text-sm">
              {{ reviews.average }}
              <span class="sr-only"> out of 5 stars</span>
            </p>
            <div class="ml-1 flex items-center">
              <StarIcon
                v-for="rating in [0, 1, 2, 3, 4]"
                :key="rating"
                :class="[
                  reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                  'h-5 w-5 flex-shrink-0'
                ]"
                aria-hidden="true"
              />
            </div>
            <div aria-hidden="true" class="ml-4 text-sm text-gray-300">·</div>
            <div class="ml-4 flex">
              <a class="text-sm font-medium text-selected" href="#"
                >See all {{ reviews.totalCount }} reviews</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Image gallery -->
      <div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
        <h2 class="sr-only">Images</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
          <img
            v-for="image in product.images"
            :key="image.id"
            :alt="image.imageAlt"
            :class="[
              image.primary ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
              'rounded-lg'
            ]"
            :src="image.imageSrc"
          />
        </div>
      </div>

      <div class="mt-8 lg:col-span-5">
        <form>
          <!-- Color picker -->
          <div>
            <h2 class="text-sm font-medium">Color</h2>

            <fieldset aria-label="Choose a color" class="mt-2">
              <RadioGroup v-model="selectedColor" class="flex items-center space-x-3">
                <RadioGroupOption
                  v-for="color in product.colors"
                  :key="color.name"
                  v-slot="{ active, checked }"
                  :aria-label="color.name"
                  :value="color"
                  as="template"
                >
                  <div
                    :class="[
                      color.selectedColor,
                      active && checked ? 'ring ' : '',
                      !active && checked ? 'ring-2' : '',
                      'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                    ]"
                  >
                    <span
                      :class="[
                        color.bgColor,
                        'h-8 w-8 rounded-full border border-black border-opacity-10'
                      ]"
                      aria-hidden="true"
                    />
                  </div>
                </RadioGroupOption>
              </RadioGroup>
            </fieldset>
          </div>

          <!-- Size picker -->
          <div class="mt-8">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-medium">Size</h2>
              <a class="text-sm font-medium text-primary hover:text-primary-300" href="#"
                >See sizing chart</a
              >
            </div>

            <fieldset aria-label="Choose a size" class="mt-2">
              <RadioGroup v-model="selectedSize" class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                <RadioGroupOption
                  v-for="size in product.sizes"
                  :key="size.name"
                  v-slot="{ active, checked }"
                  :disabled="!size.inStock"
                  :value="size"
                  as="template"
                >
                  <div
                    :class="[
                      size.inStock
                        ? 'cursor-pointer focus:outline-none'
                        : 'cursor-not-allowed opacity-25',
                      active ? '' : '',
                      checked ? 'border-transparent bg-selected text-white ' : ' bg-card ',
                      'flex  items-center justify-center rounded-md  shadow px-3 py-3 text-sm font-medium uppercase sm:flex-1'
                    ]"
                  >
                    {{ size.name }}
                  </div>
                </RadioGroupOption>
              </RadioGroup>
            </fieldset>
          </div>

          <button
            class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Add to cart
          </button>
        </form>

        <!-- Product details -->
        <div class="mt-10">
          <h2 class="text-sm font-medium">Description</h2>

          <div class="prose prose-sm mt-4" v-html="product.description" />
        </div>

        <div class="mt-8 border-t border-gray-200 pt-8">
          <h2 class="text-sm font-medium">Fabric &amp; Care</h2>

          <div class="prose prose-sm mt-4">
            <ul role="list">
              <li v-for="item in product.details" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <!-- Policies -->
        <section aria-labelledby="policies-heading" class="mt-10">
          <h2 id="policies-heading" class="sr-only">Our Policies</h2>

          <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div
              v-for="policy in policies"
              :key="policy.name"
              class="rounded-lg border border-card-color bg-card p-6 text-center"
            >
              <dt>
                <component
                  :is="policy.icon"
                  aria-hidden="true"
                  class="mx-auto h-6 w-6 flex-shrink-0"
                />
                <span class="mt-4 text-sm font-medium">{{ policy.name }}</span>
              </dt>
              <dd class="mt-1 text-sm">{{ policy.description }}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>

    <!-- Reviews -->
    <section aria-labelledby="reviews-heading" class="mt-16 sm:mt-24">
      <h2 id="reviews-heading" class="text-lg font-medium">Recent reviews</h2>

      <div class="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
        <div
          v-for="review in reviews.featured"
          :key="review.id"
          class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
        >
          <div
            class="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8"
          >
            <div class="flex items-center xl:col-span-1">
              <div class="flex items-center">
                <StarIcon
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0'
                  ]"
                  aria-hidden="true"
                />
              </div>
              <p class="ml-3 text-sm">
                {{ review.rating }}<span class="sr-only"> out of 5 stars</span>
              </p>
            </div>

            <div class="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
              <h3 class="text-sm font-medium">{{ review.title }}</h3>

              <div class="mt-3 space-y-6 text-sm" v-html="review.content" />
            </div>
          </div>

          <div
            class="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3"
          >
            <p class="font-medium">{{ review.author }}</p>
            <time
              :datetime="review.datetime"
              class="ml-4 border-l border-gray-200 pl-4 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
              >{{ review.date }}</time
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Related products -->
    <section aria-labelledby="related-heading" class="mt-16 sm:mt-24">
      <h2 id="related-heading" class="text-lg font-medium">Customers also purchased</h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          class="group relative"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80"
          >
            <img
              :alt="relatedProduct.imageAlt"
              :src="relatedProduct.imageSrc"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div class="mt-4 flex justify-between items-center gap-2">
            <div>
              <h3 class="text-sm">
                <a :href="relatedProduct.href">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ relatedProduct.name }}
                </a>
              </h3>
              <p class="mt-1 text-sm">{{ relatedProduct.color }}</p>
            </div>
            <p class="text-sm font-medium">{{ relatedProduct.price }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/20/solid'
import type { ProductModel } from '@/models/product.model'

interface Props {
  productSelected: ProductModel | null
}
defineProps<Props>()

const product = {
  name: 'Basic Tee',
  price: '$35',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Women', href: '#' },
    { id: 2, name: 'Clothing', href: '#' }
  ],
  images: [
    {
      id: 1,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true
    },
    {
      id: 2,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false
    },
    {
      id: 3,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false
    }
  ],
  colors: [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' }
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: false }
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors'
  ]
}
const policies = [
  {
    name: 'International delivery',
    icon: GlobeAmericasIcon,
    description: 'Get your order in 2 years'
  },
  { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" }
]
const reviews = {
  average: 3.9,
  totalCount: 512,
  featured: [
    {
      id: 1,
      title: "Can't say enough good things",
      rating: 5,
      content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
      author: 'Risako M',
      date: 'May 16, 2021',
      datetime: '2021-01-06'
    }
    // More reviews...
  ]
}
const relatedProducts = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in white.",
    price: '$35',
    color: 'Aspen White'
  }
  // More products...
]

const selectedColor = ref(product.colors[0])
const selectedSize = ref(product.sizes[2])
</script>
