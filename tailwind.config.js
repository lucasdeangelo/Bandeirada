/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '300px',
      // => @media (min-width: 300px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1280px) { ... }

      'xl': '1500px',
      // => @media (min-width: 1500px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1800px'
      // => @media (min-width: 1800px) { ... }
    },
    extend: {
      colors: {
        'azul': '#00466F',
        'vermelho': '#A80101'
      }
    },
  },
  plugins: [],
};
