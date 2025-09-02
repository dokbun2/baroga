/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      colors: {
        'background-primary': 'var(--color-background-primary, #0a0a0b)',
        'background-secondary': 'var(--color-background-secondary, #111113)',
        'background-tertiary': 'var(--color-background-tertiary, #1a1a1d)',
        'background-quaternary': 'var(--color-background-quaternary, #242428)',
        'text-primary': 'var(--color-text-primary, #f8fafc)',
        'text-secondary': 'var(--color-text-secondary, #cbd5e1)',
        'text-tertiary': 'var(--color-text-tertiary, #94a3b8)',
        'text-quaternary': 'var(--color-text-quaternary, #64748b)',
        'border-primary': 'var(--color-border-primary, rgba(255,255,255,0.08))',
        'border-secondary': 'var(--color-border-secondary, rgba(255,255,255,0.12))',
        'border-tertiary': 'var(--color-border-tertiary, rgba(255,255,255,0.16))',
        'brand': {
          'primary': '#3b82f6',
          'secondary': '#a855f7',
          'accent': '#ec4899',
        },
        'status': {
          'success': '#22c55e',
          'successLight': 'rgba(34, 197, 94, 0.1)',
          'error': '#ef4444',
          'errorLight': 'rgba(239, 68, 68, 0.1)',
          'warning': '#f59e0b',
          'warningLight': 'rgba(245, 158, 11, 0.1)',
          'info': '#06b6d4',
          'infoLight': 'rgba(6, 182, 212, 0.1)',
        },
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'gradient': 'gradient-shift 6s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}