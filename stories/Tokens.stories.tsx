import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Tokens/Colors",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;

const semanticTokens = [
  "background", "foreground",
  "card", "card-foreground",
  "popover", "popover-foreground",
  "primary", "primary-foreground",
  "secondary", "secondary-foreground",
  "muted", "muted-foreground",
  "accent", "accent-foreground",
  "destructive",
  "border", "input", "ring",
];

const chartTokens = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"];

function Swatch({ token }: { token: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 rounded-md border border-border shadow-sm"
        style={{ background: `var(--${token})` }}
      />
      <span className="font-mono text-sm text-foreground">--{token}</span>
    </div>
  );
}

export const Semantic: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 p-4">
      {semanticTokens.map((t) => (
        <Swatch key={t} token={t} />
      ))}
    </div>
  ),
};

export const Charts: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      {chartTokens.map((t) => (
        <Swatch key={t} token={t} />
      ))}
    </div>
  ),
};
