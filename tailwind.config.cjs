/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    backgroundSize: {
      gradient: "1000% 1000%",
    },
    extend: {
      backgroundImage: {
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
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
});
