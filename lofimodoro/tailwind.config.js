/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pomodoro": "url('/path-to-pomodoro-image.jpg')",
        "small-break": "url('/path-to-small-break-image.jpg')",
        "long-break": "url('/path-to-long-break-image.jpg')",
      },
      backgroundColor: {
        "pomodoro": "rgba(255, 0, 0, 0.5)",
        "small-break": "rgba(0, 255, 0, 0.5)",
        "long-break": "rgba(0, 0, 255, 0.5)",
      },
    },
  },
  variants: {
    extend: {
      backdropBlur: ["hover", "focus"],
    },
  },
  plugins: [],
};
