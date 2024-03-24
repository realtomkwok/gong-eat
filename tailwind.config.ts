import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "secondContainer": "rgba(255, 220, 191, 1)",
        "onSecondContainer": "rgba(41, 24, 6, 1)",
        "stateOnSecondContainer": "rgba(41, 24, 6, 0.08)",
        "surface": "rgba(255, 248, 245, 1)",
        "stateOnSurface": "rgba(255, 248, 245, 0.08)",
        "onSurface": "rgba(33, 26, 20, 1)",
        "surfaceTint": "rgba(134, 83, 25, 1)",
        "surfaceVariant": "rgba(242, 223, 209, 1)",
        "onSurfaceVariant": "rgba(81, 68, 58, 1)",
        "surfaceContainer": "rgba(250, 235, 224, 1)",
        "surfaceContainerHighContrast": "rgba(245, 229, 219, 1)",
        "onSurfaceContainer": "rgba(33, 26, 20, 1)",
        "outline": "rgba(131, 116, 105, 1)",
        "outlineVariant": "rgba(213, 195, 182, 1)",
        "background": "rgba(255, 248, 245, 1)",
        "onBackground": "rgba(33, 26, 20, 1)"
      },
      fontFamily: {
        "Sofia": ['sofia-pro', 'sans-serif'],
      },
      borderRadius: {
        "4xl": "2rem"
      }
    },
  },
  plugins: [],
};
export default config;
