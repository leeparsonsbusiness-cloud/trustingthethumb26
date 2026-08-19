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
        amber: {
          desert: "#E07A5F",
          glow: "#F08A6F",
          light: "#F8B195",
        },
        asphalt: {
          deep: "#1F2421",
          darker: "#161917",
          card: "#272E2A",
          border: "#363E3A",
          muted: "#515E58",
        },
        parchment: {
          DEFAULT: "#F4F1DE",
          muted: "#D8D4BC",
          dark: "#B8B49E",
        },
        sage: {
          DEFAULT: "#81B29A",
          light: "#A3D4BC",
        },
        sunset: {
          DEFAULT: "#F2CC8F",
          bright: "#FFDE9F",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        'amber-glow': '0 0 25px rgba(224, 122, 95, 0.35)',
        'sage-pulse': '0 0 20px rgba(129, 178, 154, 0.4)',
        'asphalt-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%': { opacity: '0.6', filter: 'drop-shadow(0 0 5px rgba(224, 122, 95, 0.4))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(224, 122, 95, 0.8))' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
