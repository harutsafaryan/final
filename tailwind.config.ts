import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        profalOrange : "#F1B80E",
        profalGrey : "#4D4D4D"
      }
    },
  },
  plugins: [],
} satisfies Config;
