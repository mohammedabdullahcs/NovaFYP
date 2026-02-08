/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          900: "#0F0F12",
          800: "#1A1A22"
        },
        brand: {
          500: "#3B5BFF",
          400: "#5C7BFF"
        },
        accent: {
          500: "#FF8A00",
          400: "#FFA533"
        },
        text: {
          100: "#FFFFFF",
          200: "#C7C9D3"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(59, 91, 255, 0.2)",
        glowAccent: "0 0 40px rgba(255, 138, 0, 0.2)"
      },
      borderRadius: {
        xl: "18px",
        "2xl": "24px"
      },
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-sora)", "sans-serif"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
