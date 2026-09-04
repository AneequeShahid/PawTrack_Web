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
        background: "#F8F7F3",
        surface: "#FFFFFF",
        foreground: "#17211B",
        muted: "#6B756E",
        border: "#E5E5DF",
        primary: { DEFAULT: "#7C9A78", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "#E8A87C", foreground: "#17211B" },
        accent: { DEFAULT: "#F2D06B", foreground: "#17211B" },
        pink: "#E9A6A6",
        success: "#78A878",
        warning: "#D8A74D",
        danger: "#D97878",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-jakarta)'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(30, 40, 30, 0.05)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      }
    },
  },
  plugins: [],
};
export default config;
