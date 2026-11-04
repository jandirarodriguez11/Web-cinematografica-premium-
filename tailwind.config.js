/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        coal: '#0a0a0a',
        ember: '#ff4d00',
        flame: '#ff6b00',
        blood: '#6b1209',
        cream: '#efe6d6',
        ash: '#9a8f7f',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.55em',
        ritual: '0.35em',
      },
    },
  },
  plugins: [],
}
