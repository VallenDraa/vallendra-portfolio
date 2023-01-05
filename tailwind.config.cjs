/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Segoe UI", "sans-serif"],
    },
    backgroundSize: {
      gradient: "1000% 1000%",
    },
    extend: {
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle, rgba(33,33,33,0.24) 20%, rgba(33,33,33,0.5) 90%)",
        "main-gradient":
          "linear-gradient(80deg, #fbbf24, #fb7185, #818cf8, #c084fc, #22d3ee)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        shake: {
          "0%": {
            transform: "rotateX(-20deg)",
          },
          "50%": {
            transform: "rotateX(20deg)",
          },
          "100%": {
            transform: "rotateX(0deg)",
          },
        },
        "open-nav": {
          "0%": { transform: "translateX(-100%)", opacity: "0.7" },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "close-nav": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(-100%)", opacity: "0.7" },
        },
        "open-overlay": {
          "0%": { opacity: "0.1" },
          "100%": { opacity: 1 },
        },
        "close-overlay": {
          "0%": { opacity: 1 },
          "100%": { opacity: "0.1" },
        },
        "main-gradient": {
          "0%, 100%": { backgroundPosition: "0% 76%" },
          "50%": { backgroundPosition: "100% 25%" },
        },
        squares: {
          from: {
            transform: "translateY(0) rotate(0deg)",
            opacity: 1,
            "border-radius": 0,
          },
          to: {
            transform: "translateY(-1000px) rotate(720deg)",
            opacity: 0,
            "border-radius": "50%",
          },
        },
        marquee: {
          from: { transform: "translateX(120vw)" },
          to: { transform: "translateX(-120vw)" },
        },
      },
      animation: {
        "fade-in": "fade-in 350ms ease-in",
        shake: "shake 100ms ease-in-out",
        "open-nav": "open-nav 350ms ease-in",
        "close-nav": "close-nav 350ms ease-in",
        "open-overlay": "open-overlay 350ms ease-in",
        "close-overlay": "close-overlay 350ms ease-in",
        squares: "squares 40s linear infinite",
        "main-gradient": "main-gradient 40s ease infinite",
        breathing: "main-gradient 6s ease infinite",
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
});
