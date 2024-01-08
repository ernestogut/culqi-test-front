/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // disable default container
    container: false,
  },
  corePlugins: {
    // ...
    preflight: false,
    container: false,
  },

  plugins: [
    require("tailwind-bootstrap-grid")({
      containerMaxWidths: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
      },
    }),
  ],
}
