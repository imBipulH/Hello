/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        shake: {
          "0%,50%, 100%": { transform: "translate(0px, 0px)" },
          "10%, 30%": { transform: "translate(-4px, -4px)" },
          "20%, 40%": { transform: "translate(4px, 4px)" },
        },
      },
      fontFamily: {
        nun: ["Nunito", "sans-serif"],
        sans: ["Open Sans", "sans-serif"],
        pops: ["Poppins", "sans-serif"],
      },
      colors: {
        dBlue: "#11175D",
        primary: "#5F35F5",
        lightGray: "rgba(77, 77, 77, 0.75)",
      },
      boxShadow: {
        "3xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
