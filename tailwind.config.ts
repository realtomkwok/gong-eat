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
        // Primary
        "primary": "rgba(134, 83, 25, 1)",
        "statePrimary": "rgba(134, 83, 25, 0.08)",
        "onPrimary": "rgba(255, 255, 255, 1)",
        // Secondary Container
        "secondaryContainer": "rgba(255, 220, 191, 1)",
        "onSecondaryContainer": "rgba(41, 24, 6, 1)",
        "stateOnSecondaryContainer": "rgba(41, 24, 6, 0.08)",
        // Surface
        "surface": "rgba(255, 248, 245, 1)",
        "stateOnSurface": "rgba(255, 248, 245, 0.08)",
        "onSurface": "rgba(33, 26, 20, 1)",
        // Surface Tint
        "surfaceTint": "rgba(134, 83, 25, 1)",
        // Surface Variant
        "surfaceVariant": "rgba(242, 223, 209, 1)",
        "stateSurfaceVariant": "rgba(242, 223, 209, 0.08)",
        "onSurfaceVariant": "rgba(81, 68, 58, 1)",
        // Surface Container
        "surfaceContainer": "rgba(250, 235, 224, 1)",
        "surfaceContainerHighContrast": "rgba(245, 229, 219, 1)",
        "onSurfaceContainer": "rgba(33, 26, 20, 1)",
        // Outline
        "outline": "rgba(131, 116, 105, 1)",
        // Outline Variant
        "outlineVariant": "rgba(213, 195, 182, 1)",
        // Background
        "background": "rgba(255, 248, 245, 1)",
        "onBackground": "rgba(33, 26, 20, 1)",
        // Disabled Surface
        "disabledSurface": "rgba(33, 26, 20, 0.12)",
        "onDisabledSurface": "rgba(33, 26, 20, 0.38)",

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
