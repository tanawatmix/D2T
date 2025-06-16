/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF", // Blue
        secondary: "#6f6968", // Yellow
        accent: "#808080", // Red
        neutral: " #808080", // Gray
        "base-100": "#FFFFFF", // White
      },
      keyframes: {
        "gradient-anim": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      // เพิ่มชื่อ animation เพื่อเรียกใช้
      animation: {
        "gradient-anim": "gradient-anim 5s ease infinite",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      backgroundImage: {
        "light-bg":
          "url(https://img.freepik.com/free-photo/empty-room-background-with-white-walls_23-2151020041.jpg?semt=ais_hybrid&w=740)",
        "dark-bg":
          "url('https://img.freepik.com/free-photo/black-white-background_23-2150530984.jpg?semt=ais_hybrid&w=740')",
      },
    },
  },
  plugins: [],
};
