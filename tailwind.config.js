/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.{html,js}", "./docs/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        black: {
          100: "#1f1f1f",
        },
        yellow: {},
      },
      animation: {
        appear: "appear 0.8s ease-in 1",
        disappear: "disappear 0.5s ease-in 1",
      },
      keyframes: {
        appear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        disappear: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      spacing: {
        0.05: "5%",
        0.1: "10%",
        0.15: "15%",
        0.2: "20%",
        0.25: "25%",
        0.3: "30%",
        0.35: "35%",
        0.4: "40%",
        0.45: "45%",
        0.5: "50%",
        0.55: "55%",
        0.6: "60%",
        0.65: "65%",
        0.7: "70%",
        0.75: "75%",
        0.8: "80%",
        0.85: "85%",
        0.9: "90%",
        0.95: "95%",
      },
    },
  },
  plugins: [],
};

//
