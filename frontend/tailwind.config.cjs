// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#030819",
          800: "#050F29",
          700: "#071132",
          600: "#0A1A45",
          500: "#1A2A60",
        },
        brand: {
          blue: "#4F7CFF",
          purple: "#7B61FF",
        }
      },

      backgroundImage: {
        "dark-gradient":
          "linear-gradient(to bottom, #050F29, #071132, #061028)",
        "navy-glow":
          "radial-gradient(circle at top, rgba(79,124,255,0.25), transparent 70%)",
      },

      boxShadow: {
        "glow-blue": "0px 0px 35px rgba(79,124,255,0.35)",
        "soft-dark": "0px 6px 22px rgba(0, 0, 0, 0.32)",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
