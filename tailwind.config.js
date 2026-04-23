/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './content/**/*.md',
    './app.vue'
  ],
  plugins: [
    require('@tailwindcss/typography')
  ]
}
