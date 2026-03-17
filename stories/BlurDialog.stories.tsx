import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BlurDialog } from "../src/components/blur-dialog";
import { Button } from "../src/components/ui/button";

const meta: Meta = {
  title: "Components/BlurDialog",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ backgroundImage: "url(https://picsum.photos/800/600)", backgroundSize: "cover", padding: 40, borderRadius: 12 }}>
        <Button onClick={() => setOpen(true)}>Open Blur Dialog</Button>
        <BlurDialog
          open={open}
          onOpenChange={setOpen}
          title="Blur Dialog"
          description="The page behind this dialog is blurred. The content box is solid white."
        >
          <p className="text-sm text-[#374151] mt-2">
            Use this pattern when you want strong focus on the dialog content while keeping context visible.
          </p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => setOpen(false)}>Confirm</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </BlurDialog>
      </div>
    );
  },
};
