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
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, rgb(99, 69, 237), #dc39fc)",

        // "disabled-button": "linear-gradient(to right, #D3D3D3, #D3D3D3)",
        // "blue-gradientLight": "linear-gradient(to top, #f4f2fe, #dc39fc)",
        // "dark-custom-gradient":
        //   "linear-gradient(to right, rgb(0, 0, 0), #000000)",

        // "curve-light":
        //   "linear-gradient(to right, rgba(99, 69, 237, 0.9), rgba(220, 57, 252, 0.9))",
        // "curve-dark":
        //   "linear-gradient(to right, rgba(0, 0, 0,0.7), rgba(0, 0, 0, 0.7))",
      },
    },
  },
  plugins: [],
} satisfies Config;
