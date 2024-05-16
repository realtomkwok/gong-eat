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
        "primary": "#6D3F03",
        "surfaceTint": "#865319",
        "onPrimary": "#FFFFFF",
        "primaryContainer": "#986227",
        "onPrimaryContainer": "#FFFFFF",
        "secondary": "#5D452F",
        "onSecondary": "#FFFFFF",
        "secondaryContainer": "#846850",
        "onSecondaryContainer": "#FFFFFF",
        "tertiary": "#454E26",
        "onTertiary": "#FFFFFF",
        "tertiaryContainer": "#687347",
        "onTertiaryContainer": "#FFFFFF",
        "error": "#BA1A1A",
        "onError": "#FFFFFF",
        "errorContainer": "#FFDAD6",
        "onErrorContainer": "#410002",
        "background": "#FFF8F5",
        "onBackground": "#201B16",
        "surface": "#FFF8F5",
        "onSurface": "#201B16",
        "surfaceVariant": "#F3DFD0",
        "onSurfaceVariant": "#514439",
        "outline": "#847468",
        "outlineVariant": "#D6C3B4",
        "shadow": "#000000",
        "scrim": "rgba(0, 0, 0, 0.4)",
        "inverseSurface": "#362F2A",
        "inverseOnSurface": "#FBEEE6",
        "inversePrimary": "#FDB975",
        "primaryFixed": "#FFDCBE",
        "onPrimaryFixed": "#2D1600",
        "primaryFixedDim": "#FDB975",
        "onPrimaryFixedVariant": "#693C01",
        "secondaryFixed": "#FFDCC0",
        "onSecondaryFixed": "#291806",
        "secondaryFixedDim": "#E2C0A4",
        "onSecondaryFixedVariant": "#5A422D",
        "tertiaryFixed": "#DDE8B3",
        "onTertiaryFixed": "#171E00",
        "tertiaryFixedDim": "#C1CC99",
        "onTertiaryFixedVariant": "#414B23",
        "surfaceDim": "#E4D8D0",
        "surfaceBright": "#FFF8F5",
        "surfaceContainerLowest": "#FFFFFF",
        "surfaceContainerLow": "#FEF1E9",
        "surfaceContainer": "#F8ECE3",
        "surfaceContainerHigh": "#F2E6DE",
        "surfaceContainerHighest": "#ECE0D8"

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
