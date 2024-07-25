// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'between-780-840': '780px', // Add custom breakpoint
      },
    },
  },
  plugins: [require('daisyui')],
}
