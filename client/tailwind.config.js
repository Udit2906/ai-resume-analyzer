/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. This tells Tailwind to use Inter as the default font everywhere
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // 2. This defines the custom glowing 'shimmer' animation for the progress bars
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}