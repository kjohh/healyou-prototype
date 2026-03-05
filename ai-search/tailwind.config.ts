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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-light": "var(--system-primary-light)",
        "secondary-dark": "var(--system-secondary-dark)",
        "secondary-light": "var(--system-secondary-light)",
        "button-primary": "var(--button-primary-bg)",
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
