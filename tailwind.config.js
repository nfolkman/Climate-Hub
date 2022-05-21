const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ["./index.html"],
  theme: {
    extend: {
      colors:{
        gray: colors.slate,
        'stone-blue':'#00373E',
      }
    },
  },
  plugins: [],
}
