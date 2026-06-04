/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1814F3",
        navy: "#343C6A",
        subtext: "#718EBF",
        bgpage: "#F5F7FA",
        success: "#41D4A8",
        warning: "#FFBB38",
        danger: "#FF4B4A",
        cardgray: "#EDF1F7",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "4px 4px 18px -2px rgba(231,228,232,0.75)",
        cardmd: "0px 4px 20px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
