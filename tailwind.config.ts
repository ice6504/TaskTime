/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "grid-white": "url('/grid.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#7B5EEC",
          secondary: "#435ACB",
          Neutral: "#ffffff",
          error: "#e02b1d",
          "base-100": "#000000",
        },
      },
    ],
  },
};
