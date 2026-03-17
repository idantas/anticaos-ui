import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { GlassDialog, GlassBottomSheet } from "../src/components/glass-dialog";
import { Button } from "../src/components/ui/button";

const meta: Meta = {
  title: "Components/GlassDialog",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;

export const Dialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Glass Dialog</Button>
        <GlassDialog open={open} onOpenChange={setOpen} title="Glass Dialog">
          <p className="text-sm text-[#374151]">
            This dialog uses the glassmorphism style with backdrop-blur and gradient background.
          </p>
        </GlassDialog>
      </>
    );
  },
};

export const BottomSheet: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Bottom Sheet</Button>
        <GlassBottomSheet open={open} onOpenChange={setOpen} title="Glass Bottom Sheet">
          <p className="text-sm text-[#374151]">
            Mobile-friendly bottom sheet with the same glass style.
          </p>
        </GlassBottomSheet>
      </>
    );
  },
};
