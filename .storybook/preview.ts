import type { Preview } from "@storybook/react";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "oklch(1 0 0)" },
        { name: "dark", value: "oklch(0.145 0 0)" },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      document.documentElement.className = theme === "dark" ? "dark" : "";
      return Story();
    },
  ],
};

export default preview;
