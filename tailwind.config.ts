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
        'grey-bold': '#555',
        border: "#d1d1d1",
        "modal-white": "rgba(255, 255, 255, 0.2)",
        modal: "rgba(0, 0, 0, 0.4)",
        sketelon: "rgba(0, 0, 0, 0.06)",
        bg: "#f5f5f5",
        e: "#eee",
        e7: "#e7e7e7",
        error: '#f15151',
        info: '#007bff',
        success: '#28a745',
        warning: '#ffc107',

      },
      boxShadow: {
        popup: "0 8px 16px #00000029",
      },
      fontSize: {
        nor: "15px",
        mini: "12px",
      },
      width: {
        main: "1280px",
        15: '60px'
      },
      padding: {
        18: "72px",
        2.75: "11px",
      },
      gap: {
        18: "72px",
      },
      aspectRatio: {
        collection: "10/7",
      },
    },
  },
  plugins: [],
};
export default config;
