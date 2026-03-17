import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../src/components/ui/popover";
import { GlassPopoverContent } from "../src/components/glass-dialog";
import { Button } from "../src/components/ui/button";

const meta: Meta = {
  title: "Components/Popover",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm font-semibold mb-1">Default Popover</p>
        <p className="text-sm text-muted-foreground">
          Standard shadcn popover with background and border from design tokens.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const GlassPopover: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button>Open Glass Popover</Button>
        </PopoverTrigger>
        <GlassPopoverContent
          title="Glass Popover"
          onClose={() => setOpen(false)}
          align="start"
        >
          <p className="text-sm text-[#374151]">
            Uses the same glassmorphism style as GlassDialog — backdrop-blur,
            gradient background, and subtle border.
          </p>
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={() => setOpen(false)}>
              Confirm
            </Button>
            <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </GlassPopoverContent>
      </Popover>
    );
  },
};
