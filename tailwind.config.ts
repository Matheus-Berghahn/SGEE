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
        color1: 'var(--color1)',
        color2: 'var(--color2)',
        color3: 'var(--color3)',
        color4: 'var(--color4)',
        color5: 'var(--color5)',
        color2opacity20: 'var(--color2opacity20)',
        color2opacity10: 'var(--color2opacity10)',
        'color-txt-1': 'var(--color-txt-1)',
        'color-txt-2': 'var(--color-txt-2)',
        'color-txt-3': 'var(--color-txt-3)',
        'color-txt-4': 'var(--color-txt-4)',
      },
    },
  },
  plugins: [],
};
export default config;
