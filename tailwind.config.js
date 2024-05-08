/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B57EDC'
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      }
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};
