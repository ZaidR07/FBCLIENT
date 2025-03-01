import type { Config } from "tailwindcss";

export default {
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
        theme: "var(--theme-color, #FF5D00)",
      },
      button : {
        background : "var(--theme-button , #FF5D00)",
        text : "var(--theme-button-text , #FFF)"

      }
    },
  },
  plugins: [],
} satisfies Config;
