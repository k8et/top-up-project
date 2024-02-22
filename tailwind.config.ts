import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        "blue-#1": "#3C59FF",
        "blue-#2": "#1D2939",
        "blue-#3": "#101828",
        "blue-#4": "#344054",
        "blue-#5": "#667085",
        "blue-#6": "#FAFAFD",
        "blue-#7": "#F9FAFB",
        "blue-#8": "#EAF6FF",
        "blue-#9": "#0078D6",
        "grey-#1": "#344054",
        "grey-#2": "#3C59FF",
        "grey-#3": "#667085",
        "grey-#4": "#D0D5DD",
        "grey-#5": "#EAECF0",
        "grey-#6": "#F9FAFB",
        "green-#1": "#12B76A",
        "green-#2": "#027A48",
        "green-#3": "#ECFDF3",
        "red-#1": "#000",
        "red-#2": "#C54C26",
        "red-#3": "#FEF5F2",
        "purple-#1": "#7F56D9",
        "purple-#2": "#F9F5FF",
        "orange-#1": "#E8872E",
        "orange-#2": "#B46318",
        "orange-#3": "#FEF9F2",
        error: "#CA4646"
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        appearance: "opacity 1s forwards",
        "background-modal": "opacity .1s forwards",
        "open-modal": "scale .3s forwards"
      },
      keyframes: {
        opacity: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        scale: {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      },
      fontFamily: {
        manrope: ["var(--font-manrope)"]
      }
    }
  },
  plugins: []
};
export default config;
