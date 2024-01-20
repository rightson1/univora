import type { Config } from "tailwindcss";

const colors = {
  black: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
  white: "#ffffff",
  red: {
    100: "#ffdfcc",
    200: "#ffbf9a",
    300: "#fe9e67",
    400: "#fe7e35",
    500: "#fe5e02",
    600: "#cb4b02",
    700: "#983801",
    800: "#662601",
    900: "#331300",
  },
  background: "#F0F0F0",
  indigo: {
    100: "#ccdcdf",
    200: "#99b9c0",
    300: "#6697a0",
    400: "#337481",
    500: "#005161",
    600: "#00414e",
    700: "#00313a",
    800: "#002027",
    900: "#001013",
  },
};
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        mb: { max: "640px" }, // Define your mobile breakpoint width
      },
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        quest: ["var(--font-quest)"],
      },

      colors: {
        colors: {
          ...colors,
        },
        border: "hsla(var(--border))",
        input: "hsla(var(--input))",
        ring: "hsla(var(--ring))",
        background: "hsla(var(--background))",
        foreground: "hsla(var(--foreground))",
        indigo: {
          ...colors.indigo,
          DEFAULT: colors.indigo[500],
        },
        primary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsla(var(--secondary))",
          foreground: "hsla(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsla(var(--destructive))",
          foreground: "hsla(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsla(var(--muted))",
          foreground: "hsla(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsla(var(--accent))",
          foreground: "hsla(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsla(var(--popover))",
          foreground: "hsla(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsla(var(--card))",
          foreground: "hsla(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
