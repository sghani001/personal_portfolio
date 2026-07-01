/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        bg: {
          primary: "#0d1117",
          secondary: "#131820",
          tertiary: "#171d27",
        },
        text: {
          primary: "#f8f8f8",
          secondary: "#c9d1d9",
          muted: "#6e7681",
          disabled: "#4b5158",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.16)",
        },
        accent: {
          primary: "#7ee787",
          secondary: "#58a6ff",
          amber: "#f2cc60",
        },
      },
      maxWidth: {
        content: "1020px",
      },
      borderRadius: {
        window: "8px",
        card: "6px",
        pill: "100px",
      },
    },
  },
  plugins: [],
};
