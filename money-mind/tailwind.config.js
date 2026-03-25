/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryGreen: "#22C55E",
        lightText: "#EFF2F9",
        inputBg: "#E1E5F8",
      },
      borderRadius: {
        xl2: "30px",
      },
    },
  },
  plugins: [],
};