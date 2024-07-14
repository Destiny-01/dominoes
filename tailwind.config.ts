import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-radial-at-top":
          "radial-gradient(110% 100% at 30px top, var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "button-shadow":
          "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
      },
      colors: {
        "main-blue": "#314157",
        "dark-blue": "#273446",
        "main-orange": "#ed701d",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        open_sans: ["var(--font-open-sans)"],
      },
      keyframes: {
        expand: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        expand: "expand 0.4s linear forwards",
      },
    },

    screens: {
      sm: "600px",
      md: "900px",
      xl: "1200px",
    },
  },
  plugins: [],
};
export default config;
