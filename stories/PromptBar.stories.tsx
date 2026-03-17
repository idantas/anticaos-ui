import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PromptBar, type ChatMessage } from "../src/components/prompt-bar";

const meta: Meta<typeof PromptBar> = {
  title: "Components/PromptBar",
  component: PromptBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof PromptBar>;

export const Closed: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    return (
      <div style={{ height: "100svh", background: "#f0f0f0" }}>
        <PromptBar
          open={open}
          onOpenChange={setOpen}
          messages={messages}
          placeholder="Ask anything…"
          onSubmit={async (msg) => {
            setMessages((m) => [...m, { role: "user", content: msg }]);
            setOpen(true);
            await new Promise((r) => setTimeout(r, 1000));
            setMessages((m) => [
              ...m,
              { role: "assistant", content: "This is a mock response to: " + msg },
            ]);
          }}
        />
      </div>
    );
  },
};

export const WithMessages: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
      { role: "user", content: "What is the coisas.space?" },
      {
        role: "assistant",
        content:
          "Coisas.space is a personal knowledge tool that helps you save, organize and rediscover links and ideas.",
      },
      { role: "user", content: "How does it differ from a bookmark manager?" },
      {
        role: "assistant",
        content:
          "Unlike plain bookmarks, Coisas adds AI-powered context, smart collections, and a chat interface so you can retrieve information from your own saved content.",
      },
    ]);

    return (
      <div style={{ height: "100svh", background: "#f0f0f0" }}>
        <PromptBar
          open={open}
          onOpenChange={setOpen}
          messages={messages}
          isLoading={isLoading}
          onStop={() => setLoading(false)}
          placeholder="Continue the conversation…"
          onPositionChange={() => {}}
          onSubmit={async (msg) => {
            setMessages((m) => [...m, { role: "user", content: msg }]);
            setLoading(true);
            await new Promise((r) => setTimeout(r, 1500));
            setMessages((m) => [
              ...m,
              { role: "assistant", content: `Got it! Here's my reply to: \u201C${msg}\u201D` },
            ]);
            setLoading(false);
          }}
        />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <div style={{ height: "100svh", background: "#f0f0f0" }}>
      <PromptBar
        open
        onOpenChange={() => {}}
        messages={[{ role: "user", content: "What is the meaning of life?" }]}
        isLoading
        onStop={() => {}}
        onSubmit={async () => {}}
        placeholder="Generating…"
      />
    </div>
  ),
};
