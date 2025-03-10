/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#10B981', // Emerald green
        secondary: '#F8FAFC', // Light background
        dark: '#064E3B', // Darker green
        accent: '#ECFDF5', // Light mint
        light: '#059669', // Medium green
        background: '#FFFFFF', // White
        'gray-light': '#F1F5F9',
        'gray-medium': '#E2E8F0',
        success: '#059669', // Green success
        warning: '#F59E0B', // Amber warnings
        error: '#EF4444', // Red errors
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        '200%': '200%',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(16, 185, 129, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};