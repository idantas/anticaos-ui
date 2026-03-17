import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Tokens/Colors",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;

const semanticTokens: { token: string; description: string }[] = [
  { token: "background", description: "Page background" },
  { token: "foreground", description: "Default text" },
  { token: "card", description: "Card background" },
  { token: "card-foreground", description: "Card text" },
  { token: "popover", description: "Popover background" },
  { token: "popover-foreground", description: "Popover text" },
  { token: "primary", description: "Primary action" },
  { token: "primary-foreground", description: "Text on primary" },
  { token: "secondary", description: "Secondary surface" },
  { token: "secondary-foreground", description: "Text on secondary" },
  { token: "muted", description: "Muted surface" },
  { token: "muted-foreground", description: "Muted text" },
  { token: "accent", description: "Accent surface" },
  { token: "accent-foreground", description: "Text on accent" },
  { token: "destructive", description: "Error / danger" },
  { token: "border", description: "Border" },
  { token: "input", description: "Input border" },
  { token: "ring", description: "Focus ring" },
];

const chartTokens = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"];

const sidebarTokens = [
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

function Swatch({ token, description }: { token: string; description?: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div
        className="h-9 w-9 rounded-lg shrink-0"
        style={{
          background: `var(--${token})`,
          border: "1px solid var(--border)",
        }}
      />
      <div>
        <p className="font-mono text-xs text-foreground">--{token}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-foreground mb-3 pb-1 border-b border-border">{title}</h2>
      {children}
    </div>
  );
}

export const All: StoryObj = {
  name: "All Tokens",
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      <Section title="Semantic">
        {semanticTokens.map((t) => (
          <Swatch key={t.token} token={t.token} description={t.description} />
        ))}
      </Section>
      <Section title="Charts">
        {chartTokens.map((t) => (
          <Swatch key={t} token={t} />
        ))}
      </Section>
      <Section title="Sidebar">
        {sidebarTokens.map((t) => (
          <Swatch key={t} token={t} />
        ))}
      </Section>
    </div>
  ),
};

export const RadiusScale: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-4">
      {["sm", "md", "lg", "xl"].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <div
            className="h-16 w-16 bg-primary"
            style={{ borderRadius: `var(--radius-${size})` }}
          />
          <span className="font-mono text-xs text-muted-foreground">--radius-{size}</span>
        </div>
      ))}
    </div>
  ),
};
