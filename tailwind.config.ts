// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        border: "rgb(var(--fg) / 0.12)",   // 👈 necesario para border-border
      },
      boxShadow: {
        soft: "0 2px 6px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
