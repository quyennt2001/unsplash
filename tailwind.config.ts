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
        text: "#111",
        grey: "#767676",
        border: "#d1d1d1",
        "modal-white": "rgba(255, 255, 255, 0.2)",
        modal: "rgba(0, 0, 0, 0.3)"
      },
      boxShadow: {
        popup: "0 8px 16px #00000029",
      },
    },
  },
  plugins: [],
};
export default config;
