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
    extend: {
      backgroundPosition: {
        gradient: "1000% 1000%",
      },
      backgroundImage: {
        "main-gradient":
          "linear-gradient(79deg, #fbbf24, #fb7185, #818cf8, #c084fc, #22d3ee)",
      },
      keyrames: {
        breathing: {
          "0%, 100%": { backgroundPosition: "0% 76%" },
          "50%": { backgroundPosition: "100% 25%" },
        },
      },
      animation: { "main-gradient": "breathing 20s ease infinite" },
    },
  },
  plugins: [],
});
