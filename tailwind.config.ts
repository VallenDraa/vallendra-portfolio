import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    backgroundSize: { gradient: "400% 400%" },
    extend: {
      colors: {
        "top-pick": {
          dark: "#1d1d20",
          light: "#e9eeff",
        },
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle, rgba(33,33,33,0.24) 20%, rgba(33,33,33,0.5) 90%)",
        "main-gradient":
          "linear-gradient(80deg, #fbbf24, #fb7185, #818cf8, #c084fc)",
      },
      keyframes: {
        "fade-in-left": {
          "0%": { transform: "translateX(-80px)", opacity: "0" },
          "50%": { transform: "translateX(4.8px)", opacity: "0.6" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in-right": {
          "0%": { transform: "translateX(80px)", opacity: "0" },
          "50%": { transform: "translateX(-4.8px)", opacity: "0.6" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in-bottom": {
          "0%": { transform: "translateY(-80px)", opacity: "0" },
          "50%": { transform: "translateY(4.8px)", opacity: "0.6" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in-top": {
          "0%": { transform: "translateY(80px)", opacity: "0" },
          "50%": { transform: "translateY(-4.8px)", opacity: "0.6" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "main-gradient": {
          "0%, 100%": { backgroundPosition: "0% 75%" },
          "50%": { backgroundPosition: "100% 25%" },
        },
        squares: {
          from: {
            transform: "translateY(0) rotate(0deg)",
            opacity: "1",
            "border-radius": "0",
          },
          to: {
            transform: "translateY(-1000px) rotate(720deg)",
            opacity: "0",
            "border-radius": "50%",
          },
        },
      },
      animation: {
        "fade-in-left": "fade-in-left 700ms ease-in-out",
        "fade-in-right": "fade-in-right 700ms ease-in-out",
        "fade-in-bottom": "fade-in-bottom 700ms ease-in-out",
        "fade-in-top": "fade-in-top 700ms ease-in-out",
        "fade-in": "fade-in 350ms ease-out",
        squares: "squares 40s linear infinite",
        "main-gradient": "main-gradient 25s ease infinite",
        breathing: "main-gradient 8s ease infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
