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
        "custom-gradient":
          "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(48,25,78,1) 50%, rgba(0,0,0,1) 100%)",
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
          "base-100": "#151515",
        },
      },
    ],
  },
};
