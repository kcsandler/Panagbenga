/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1A1015",
        surface: "#251820",
        "surface-raised": "#2F2030",
        primary: "#4A1560",
        accent: "#F4623A",
        positive: "#4CAF82",
        "neutral-sentiment": "#F0A500",
        negative: "#E05252",
        cream: "#FBF5EC",
        muted: "#A08898",
        border: "#3D2840",
      },
      fontFamily: {
        display: ['"DM Serif Display"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
