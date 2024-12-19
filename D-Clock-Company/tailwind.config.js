/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}"

  ],
  theme: {
    extend: {
      textShadow: {
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.1)',  // Small shadow
        'DEFAULT': '2px 2px 4px rgba(0, 0, 0, 0.2)',  // Default shadow
        'md': '3px 3px 6px rgba(0, 0, 0, 0.3)',  // Medium shadow
        'lg': '4px 4px 8px rgba(0, 0, 0, 0.4)',  // Large shadow
        'xl': '4px 4px 8px rgba(0, 0, 0, 0.5)',  // X-Large shadow
        '2xl': '4px 4px 8px rgba(0, 0, 0, 0.6)',  // 2X-Large shadow
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-md': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-lg': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-xl': {
          textShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-2xl': {
          textShadow: '6px 6px 12px rgba(0, 0, 0, 0.6)',
        },
      })
    }
  ],
}

