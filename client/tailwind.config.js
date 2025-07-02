/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nexus-blue': '#325f8c',
        'nexus-blue-hover': '#2a4f73',
        'nexus-blue-light': '#4a7ba8',
        'nexus-orange': '#f97316',
        'nexus-orange-hover': '#ea580c',
      },
    },
  },
  plugins: [],
}