// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#2C1810',
        coffee: '#4A3728',
        cream: '#F5E6D3',
        gold: '#D4AF37',
        terracotta: '#C67B5C',
        latte: '#E8D5B7',
        dark: '#1A1110',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}