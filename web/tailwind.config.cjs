import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fall: "fall 10s linear infinite",
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(-10%)", opacity: "0" }, // Start off invisible
          "10%": { opacity: "0.8" }, // Fade in during the start
          "100%": { transform: "translateY(110%)", opacity: "0.5" }, // Fall off and fade slightly
        },
      },
    },
  },
  darkMode: "selector",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FDFDFD",
            primary: {
              DEFAULT: "#F46036", // The main color
              50: "#fde5de",
              100: "#f9c4b1",
              200: "#f69b7f",
              300: "#f2724d",
              400: "#f06036", // Close to DEFAULT but slightly lighter
              500: "#F46036", // The main color
              600: "#db4b2b",
              700: "#b43c22",
              800: "#8d2d19",
              900: "#661e10",
            },
          },
        default_text:{50:"#fff", default:"#000"}
        },
        dark: {
          colors: {
            background: "#121212",
            primary: {
              DEFAULT: "#F46036", // The main color
              50: "#fde5de",
              100: "#f9c4b1",
              200: "#f69b7f",
              300: "#f2724d",
              400: "#f06036", // Close to DEFAULT but slightly lighter
              500: "#F46036", // The main color
              600: "#db4b2b",
              700: "#b43c22",
              800: "#8d2d19",
              900: "#661e10",
            },
            default_text:{default:"#fff", 50:"#fff"}
          },
        },
      },
    })
  ],
};