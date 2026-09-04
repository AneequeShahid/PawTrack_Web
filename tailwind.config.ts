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
        background: "#0B0F14",
        card: "#141C26",
        border: "#263241",
        primary: "#5B8DEF",
        success: "#4ADE80",
        warning: "#F5A623",
        destructive: "#F87171",
      },
    },
  },
  plugins: [],
};
export default config;
