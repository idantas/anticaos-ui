import type { Meta, StoryObj } from "@storybook/react";
import { PromptBar } from "../src/components/prompt-bar";

const meta: Meta<typeof PromptBar> = {
  title: "Components/PromptBar",
  component: PromptBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof PromptBar>;

export const Default: Story = {
  args: {
    onSubmit: (msg) => alert(`Submitted: ${msg}`),
    placeholder: "Ask anything…",
  },
};

export const Loading: Story = {
  args: {
    onSubmit: async () => {},
    isLoading: true,
    onStop: () => alert("Stopped!"),
    placeholder: "Generating…",
  },
};

export const Disabled: Story = {
  args: {
    onSubmit: async () => {},
    disabled: true,
    placeholder: "Input disabled",
  },
};

export const CustomPlaceholder: Story = {
  args: {
    onSubmit: (msg) => console.log(msg),
    placeholder: "Search or ask a question…",
  },
};
