/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",      // same purple as screenshot
        accent: "#8b5cf6",
        background: "#ffffff",
        border: "#e5e7eb",
        muted: "#6b7280",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideInRight: "slideInRight 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(15px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        slideInRight: {
          "0%": { opacity: 0, transform: "translateX(40px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
      },
    },
  },
  plugins: [],
};
