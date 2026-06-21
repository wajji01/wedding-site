import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FFF9E6",
          100: "#FFF0C2",
          200: "#FFE085",
          300: "#FFD047",
          400: "#FFC11F",
          500: "#FFAA00",
          600: "#E69000",
          700: "#B36D00",
          800: "#804E00",
          900: "#4D2F00",
        },
        royal: {
          50: "#F0EBF8",
          100: "#DDD0F0",
          200: "#BBA1E1",
          300: "#9972D2",
          400: "#7743C3",
          500: "#5514B4",
          600: "#440F90",
          700: "#330B6C",
          800: "#220748",
          900: "#110324",
          950: "#08011A",
        },
        dark: {
          900: "#040108",
          800: "#080210",
          700: "#0C0318",
          600: "#100420",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        great_vibes: ["var(--font-great-vibes)", "cursive"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 170, 0, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 170, 0, 0.9)" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "royal-gradient": "linear-gradient(135deg, #040108 0%, #0C0318 30%, #110324 60%, #040108 100%)",
        "gold-gradient": "linear-gradient(135deg, #B36D00 0%, #FFAA00 50%, #FFD047 100%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
