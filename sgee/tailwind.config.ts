import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
        color1: '#1D1D1D',
        color2: '#FFFFFF',
        color3: '#0A689D',
        color4: '#FFE381',
        color5: '#84b3ce',
        color2opacity20: '#1e1e1e96',
        color2opacity10: '#1e1e1e50',
        'color-txt-1': '#000000',
        'color-txt-2': '#FFFFFF',
        'color-txt-3': '#E0E0E0',
      },
    },
  },
  plugins: [],
};
export default config;
