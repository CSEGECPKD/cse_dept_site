/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      "mdlg": "950px",
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lgmd': '1150px',
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },
    extend: {
      
      fontFamily: {
        montserrat: "var(--font-montserrat), monospace",
        bebasneue: "var(--font-bebasneue), monospace",
      },
      fontSize: {
        "5.5xl": "3.5rem",
      },
      colors: {
        newblue: "#0D38B1",
      },
      letterSpacing: {
        "link": "0.64px"
      },

    },
  },
  plugins: [],
};
