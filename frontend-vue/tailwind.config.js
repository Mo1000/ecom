import PrimeUI from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['selector', '[class="p-dark"]'],
  plugins: [PrimeUI],
  theme: {
    extend: {
      colors: {
        selected: 'var(--color-selected)'
      }
    }
  }
}
