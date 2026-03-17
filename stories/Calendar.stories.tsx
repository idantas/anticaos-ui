import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "../src/components/ui/calendar";

const meta: Meta = {
  title: "Components/Calendar",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;

export const Single: StoryObj = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

export const Range: StoryObj = {
  render: () => {
    const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({
      from: new Date(),
      to: undefined,
    });
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={(r) => setRange(r ?? { from: undefined })}
        className="rounded-md border"
        numberOfMonths={2}
      />
    );
  },
};
