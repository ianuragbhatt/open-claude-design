import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        surface: "var(--surface)",
        "surface-subtle": "var(--surface-subtle)",
        border: "var(--border)",
        "terracotta-hover": "#E28767",
        terracotta: {
          DEFAULT: "#D97757",
          hover: "#E28767",
          50: "#FAF2EE",
          100: "#F4E3DC",
          200: "#E9C5B7",
          300: "#DEA492",
          400: "#E28767",
          500: "#D97757",
          600: "#CC6846",
          700: "#B85A3F",
          800: "#96452E",
          900: "#7A3420",
        },
        espresso: {
          DEFAULT: "#1F1E1C",
          50: "#FAF9F5",
          100: "#F3F1EC",
          200: "#E5E0D8",
          300: "#C2BFB6",
          400: "#8F8B82",
          500: "#6B6860",
          600: "#484540",
          700: "#383632",
          800: "#282724",
          900: "#1F1E1C",
          950: "#141413",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Styrene B", "Styrene", "Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["var(--font-newsreader)", "Tiempos Text", "Copernicus", "Newsreader", "Georgia", "serif"],
        editorial: ["var(--font-newsreader)", "Tiempos Text", "Copernicus", "Newsreader", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
