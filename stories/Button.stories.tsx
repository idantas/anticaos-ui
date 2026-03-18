import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/ui/button";
import {
  BookStack,
  Plus,
  Sparks,
  ShareIos,
  EditPencil,
  Trash,
  NavArrowDown,
  CreditCard,
  Quote,
  PiggyBank,
} from "iconoir-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link", "float", "glass"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-lg"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

/** ── Interactive ──────────────────────────────────────────── */
export const Default: Story = {
  args: { children: "Button" },
};

/** ── All standard variants ──────────────────────────────── */
export const Variants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="lg">Large</Button>
      <Button size="default">Default</Button>
      <Button size="sm">Small</Button>
      <Button size="icon"><Plus /></Button>
      <Button size="icon-lg"><Plus className="w-5 h-5" /></Button>
    </div>
  ),
};

/** ── Float variant ──────────────────────────────────────── */
export const Float: StoryObj = {
  name: "Float — icon buttons over content",
  parameters: {
    backgrounds: {
      default: "image",
      values: [{ name: "image", value: "url(https://picsum.photos/800/500) center/cover" }],
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 items-center p-12">
      {/* Vertical stack — FloatingActionBar pattern */}
      <div className="flex flex-col gap-2">
        <Button variant="float" size="icon-lg"><BookStack className="w-5 h-5" /></Button>
        <Button variant="float" size="icon-lg"><Plus className="w-5 h-5" /></Button>
        <Button variant="float" size="icon-lg"><Sparks className="w-5 h-5" /></Button>
        <Button variant="float" size="icon-lg"><ShareIos className="w-5 h-5" /></Button>
        <Button variant="float" size="icon-lg"><EditPencil className="w-5 h-5" /></Button>
        <Button variant="float" size="icon-lg"><Trash className="w-5 h-5" /></Button>
      </div>
      {/* Text + icon — PLGNavbar "Descubra quanto vale" pattern */}
      <Button variant="float" className="px-6 py-3 h-auto gap-2">
        <span>Descubra quanto vale o que você esquece</span>
        <NavArrowDown className="w-5 h-5 shrink-0" />
      </Button>
    </div>
  ),
};

/** ── Glass variant ──────────────────────────────────────── */
export const Glass: StoryObj = {
  name: "Glass — navbar / inside glass containers",
  parameters: {
    backgrounds: {
      default: "image",
      values: [{ name: "image", value: "url(https://picsum.photos/800/500) center/cover" }],
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 items-center p-12">
      {/* Icon row — PLGNavbar pattern */}
      <div className="flex gap-2">
        <Button variant="glass" size="icon-lg"><Quote className="w-5 h-5" /></Button>
        <Button variant="glass" size="icon-lg"><CreditCard className="w-5 h-5" /></Button>
        <Button variant="glass" size="icon-lg"><PiggyBank className="w-5 h-5" /></Button>
      </div>
      {/* With text */}
      <div className="flex gap-2">
        <Button variant="glass" className="px-5 h-10 gap-2">
          <Sparks className="w-4 h-4" />
          Assinar Pro
        </Button>
        <Button variant="glass" className="px-5 h-10">Manifesto</Button>
      </div>
    </div>
  ),
};

/** ── Float vs Glass comparison ─────────────────────────── */
export const Comparison: StoryObj = {
  name: "Float vs Glass",
  parameters: {
    backgrounds: {
      default: "image",
      values: [{ name: "image", value: "url(https://picsum.photos/800/500) center/cover" }],
    },
  },
  render: () => (
    <div className="flex gap-12 p-12">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-white/80 font-medium mb-1">float</p>
        <Button variant="float" size="icon-lg"><Sparks className="w-5 h-5" /></Button>
        <Button variant="float" className="px-5 h-10">Float button</Button>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-white/80 font-medium mb-1">glass</p>
        <Button variant="glass" size="icon-lg"><Sparks className="w-5 h-5" /></Button>
        <Button variant="glass" className="px-5 h-10">Glass button</Button>
      </div>
    </div>
  ),
};
