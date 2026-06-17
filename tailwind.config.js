/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          950: '#030308',
          900: '#050510',
          800: '#0a0a1a',
          700: '#0f0f2a',
          600: '#151530',
          500: '#1a1a3a',
          400: '#252550',
          300: '#353570',
          200: '#454590',
          100: '#6060b0',
        },
        gold: {
          50: '#fef8e7',
          100: '#fdebb8',
          200: '#fcde89',
          300: '#fbd15a',
          400: '#fac42b',
          500: '#d4a817',
          600: '#a88612',
          700: '#7c640d',
          800: '#504208',
          900: '#242004',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-flow': 'grid-flow 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(250, 196, 43, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(250, 196, 43, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'grid-flow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
