import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Tokens/Typography",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;

const fontSizes: { token: string; label: string; px: string }[] = [
  { token: "--font-size-2xs", label: "2xs", px: "11px" },
  { token: "--font-size-xs", label: "xs", px: "12px" },
  { token: "--font-size-sm", label: "sm", px: "13px" },
  { token: "--font-size-base", label: "base", px: "14px" },
  { token: "--font-size-lg", label: "lg", px: "16px" },
  { token: "--font-size-xl", label: "xl", px: "18px" },
  { token: "--font-size-2xl", label: "2xl", px: "20px" },
];

const lineHeights: { token: string; label: string; value: string }[] = [
  { token: "--line-height-tight", label: "tight", value: "1.2" },
  { token: "--line-height-snug", label: "snug", value: "1.3" },
  { token: "--line-height-normal", label: "normal", value: "1.5" },
  { token: "--line-height-relaxed", label: "relaxed", value: "1.6" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-semibold text-foreground mb-3 pb-1 border-b border-border">
        {title}
      </h2>
      {children}
    </div>
  );
}

export const FontSizes: StoryObj = {
  render: () => (
    <Section title="Font Size Scale">
      <div className="space-y-4">
        {fontSizes.map(({ token, label, px }) => (
          <div key={token} className="flex items-baseline gap-4">
            <div className="w-32 shrink-0 text-right">
              <span className="font-mono text-xs text-muted-foreground">{token}</span>
            </div>
            <span
              className="text-foreground leading-none"
              style={{ fontSize: `var(${token})` }}
            >
              The quick brown fox
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {label} / {px}
            </span>
          </div>
        ))}
      </div>
    </Section>
  ),
};

export const FontFamilies: StoryObj = {
  render: () => (
    <Section title="Font Families">
      <div className="space-y-6">
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-1">--font-sans</p>
          <p
            className="text-foreground text-lg"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Sans-serif — The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-1">--font-mono</p>
          <p
            className="text-foreground text-lg"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Monospace — const answer = 42; // always
          </p>
        </div>
      </div>
    </Section>
  ),
};

export const LineHeights: StoryObj = {
  render: () => (
    <Section title="Line Height Scale">
      <div className="grid grid-cols-2 gap-8">
        {lineHeights.map(({ token, label, value }) => (
          <div key={token} className="p-4 rounded-lg border border-border bg-muted/30">
            <p className="font-mono text-xs text-muted-foreground mb-2">
              {token} ({value})
            </p>
            <p
              className="text-sm text-foreground"
              style={{ lineHeight: `var(${token})` }}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)} line height. This
              paragraph demonstrates how text wraps with this leading value across
              multiple lines of content.
            </p>
          </div>
        ))}
      </div>
    </Section>
  ),
};
