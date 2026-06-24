import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Paleta Caeiro & Reis — festiva, colorida, kawaii
        rosa:     { DEFAULT: "#FF85A2", escuro: "#E8607F", claro: "#FFD6E0" },
        azul:     { DEFAULT: "#7EC8E3", escuro: "#4A9FBF", claro: "#D4F0FA" },
        amarelo:  { DEFAULT: "#FFD66B", escuro: "#E5B800", claro: "#FFF3C4" },
        lavanda:  { DEFAULT: "#B59EF5", escuro: "#8B6FE8", claro: "#EAE4FF" },
        menta:    { DEFAULT: "#6FCF97", escuro: "#3DAA6F", claro: "#C8F0DA" },
        fundo:    "#FFF8FA",
        "fundo-2": "#F0F8FF",
        titulo:   "#2D5986",
        texto:    "#4A4A6A",
        "texto-suave": "#8888AA",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        titulo: ["var(--font-nunito)", "Nunito", "system-ui", "sans-serif"],
        corpo:  ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem", "2xl": "1.5rem", "3xl": "2rem",
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        wiggle:    { "0%,100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "pop-in":  { "0%": { transform: "scale(0.8)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        wiggle:    "wiggle 0.6s ease-in-out",
        float:     "float 3s ease-in-out infinite",
        "pop-in":  "pop-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
