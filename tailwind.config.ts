import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#308c63",
        fadedPrimary: "rgb(48, 140, 99, 0.1)",
        highlight: "#877838",
      },

      gridTemplateColumns: {
        220: "repeat(auto-fit,minmax(220px,1fr))",
        240: "repeat(auto-fit,minmax(240px,1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
