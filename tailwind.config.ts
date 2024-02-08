import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./node_modules/element-plus/**/*.{vue,js,ts}"],
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "grid-cols-auto-fit": (value) => ({
            gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
          }),
          "grid-cols-auto-fill": (value) => ({
            gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
          }),
        },
        { values: theme("width") },
      );
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "grid-rows-auto-fit": (value) => ({
            gridTemplateRows: `repeat(auto-fit, minmax(${value}, 1fr))`,
          }),
          "grid-rows-auto-fill": (value) => ({
            gridTemplateRows: `repeat(auto-fill, minmax(${value}, 1fr))`,
          }),
        },
        { values: theme("height") },
      );
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.purple,
        success: colors.green,
        warning: colors.yellow,
        danger: colors.red,
      },
      spacing: {
        DEFAULT: "16rem",
        xs: "12rem",
        sm: "14rem",
        md: "16rem",
        lg: "18rem",
        xl: "20rem",
      },
    },
  },
} satisfies Partial<Config>;
