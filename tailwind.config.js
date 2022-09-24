/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slidein": "slidein 1s ease-in-out 1"
      },
      keyframes: {
        slidein: {
          "0%": { transform: 'translateY(-100%)' },
          "100%": { transform: 'translateY(0%)' },
        }
      }
    },
  },
  plugins: [],
}
