const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      track: ["Track", ...defaultTheme.fontFamily.sans],
      fibre: ["Fibre", ...defaultTheme.fontFamily.sans],
      kitchen: ["Kitchen", ...defaultTheme.fontFamily.sans],
      somatic: ["Somatic", ...defaultTheme.fontFamily.sans],
      supernet: ["Supernettcn", ...defaultTheme.fontFamily.sans],
      virgil: ["Virgil", ...defaultTheme.fontFamily.sans],
      belle: ["La Belle Aurore", ...defaultTheme.fontFamily.sans],
      exo: ["Exo", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
};
