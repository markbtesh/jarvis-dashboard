/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // Ensure it covers all files in src
  ],
  theme: {
    extend: {
      colors: {
        'glow-blue': '#00f2ff',
        'glow-cyan': '#00e6e6',
      },
      boxShadow: {
        'glow-blue': '0 0 20px 5px rgba(0, 242, 255, 0.8)',
        'glow-cyan': '0 0 20px 5px rgba(0, 230, 230, 0.8)',
      },
      fontFamily: {
        techno: ['"Techno"', 'sans-serif'], // Replace with the correct font name from cdnfonts
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
        'reverse-spin': 'reverse-spin 20s linear infinite',
        'reverse-spin-slow': 'reverse-spin 40s linear infinite',
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'reverse-spin': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
};

