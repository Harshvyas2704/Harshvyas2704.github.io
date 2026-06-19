/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050816',
        surface: '#0B1020',
        'royal-blue': '#4169E1',
        'electric-blue': '#4DA6FF',
        cream: '#F4F7FF',
        muted: '#A0AEC0',
      },
      fontFamily: {
        sans: ['"Cabinet Grotesk"', 'Sora', 'Manrope', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 6s ease-in-out infinite',
        'glow-pulse-slow': 'glowPulse 9s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.35' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
