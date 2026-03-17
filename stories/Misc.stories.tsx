import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../src/components/ui/hover-card";
import { ScrollArea } from "../src/components/ui/scroll-area";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "../src/components/ui/pagination";
import { Button } from "../src/components/ui/button";
import { Separator } from "../src/components/ui/separator";

const meta: Meta = {
  title: "Components/Misc",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

export const HoverCardStory: StoryObj = {
  name: "HoverCard",
  render: () => (
    <div className="flex items-center justify-center h-40">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@iversondantas</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-1">
            <p className="text-sm font-semibold">Iverson Dantas</p>
            <p className="text-xs text-muted-foreground">Criador do Coisas.space — transforma o que você salva no que você aprende.</p>
            <p className="text-xs text-muted-foreground pt-1">Desde março 2026</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const ScrollAreaStory: StoryObj = {
  name: "ScrollArea",
  render: () => (
    <ScrollArea className="h-[200px] w-[320px] rounded-md border p-4">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="py-2 border-b border-border last:border-0">
          <p className="text-sm font-medium">Link #{i + 1}</p>
          <p className="text-xs text-muted-foreground">smashingmagazine.com</p>
        </div>
      ))}
    </ScrollArea>
  ),
};

export const PaginationStory: StoryObj = {
  name: "Pagination",
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
