import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--secondary))", // Pink (old_rose-500) for Blast Beyond
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sky_blue: {
          DEFAULT: '#75C5E7',
          100: '#0a2c3b',
          200: '#155976',
          300: '#1f85b1',
          400: '#39abdc',
          500: '#75c5e7',
          600: '#90d0eb',
          700: '#acdcf0',
          800: '#c8e7f5',
          900: '#e3f3fa',
        },
        white: {
          DEFAULT: '#FEFEFE',
          100: '#333333',
          200: '#666666',
          300: '#999999',
          400: '#cccccc',
          500: '#fefefe',
          600: '#ffffff',
          700: '#ffffff',
          800: '#ffffff',
          900: '#ffffff',
        },
        misty_rose: {
          DEFAULT: '#EAD7D8',
          100: '#3b1f20',
          200: '#763e41',
          300: '#ac6165',
          400: '#cb9c9e',
          500: '#ead7d8',
          600: '#eedfe0',
          700: '#f2e7e8',
          800: '#f7efef',
          900: '#fbf7f7',
        },
        old_rose: {
          DEFAULT: '#AD7A80',
          100: '#251618',
          200: '#492d30',
          300: '#6e4348',
          400: '#935a61',
          500: '#ad7a80',
          600: '#be959a',
          700: '#ceafb3',
          800: '#decacc',
          900: '#efe4e6',
        },
        rose_taupe: {
          DEFAULT: '#A2676D',
          100: '#211415',
          200: '#42282b',
          300: '#633c40',
          400: '#845156',
          500: '#a2676d',
          600: '#b5868a',
          700: '#c7a4a7',
          800: '#dac2c5',
          900: '#ece1e2',
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
} satisfies Config

export default config
