/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.tsx"],
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
        squares: "squares 40s linear infinite",
        "main-gradient": "main-gradient 40s ease infinite",
        breathing: "main-gradient 6s ease infinite",
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
});
