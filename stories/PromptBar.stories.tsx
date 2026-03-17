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

/** Quick command button matching the coisas.space design */
function QuickCmd({
  label,
  gradient = false,
  locked = false,
  onClick,
}: {
  label: string;
  gradient?: boolean;
  locked?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-[8px] py-[4px] rounded-[8px] text-[12px] font-semibold text-[#171717] hover:bg-black/5 transition-colors flex items-center gap-1"
      style={{ opacity: locked ? 0.4 : 1 }}
    >
      {gradient ? (
        <span
          style={{
            background: "linear-gradient(90deg, #4533ae, #70d4ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {label}
        </span>
      ) : (
        label
      )}
    </button>
  );
}

/** Quick commands row as rendered in the real app (closed state) */
function ClosedCommands({ onCommand }: { onCommand?: (prompt: string) => void }) {
  return (
    <div className="flex gap-[8px] flex-wrap">
      <QuickCmd label="/ Resumir recentes" onClick={() => onCommand?.("/resumir os conteúdos recentes que salvei")} />
      <QuickCmd label="/ Criar trilha" onClick={() => onCommand?.("/criar uma trilha de aprendizado com meus conteúdos")} />
      <QuickCmd label="/ Novo Foco" gradient onClick={() => onCommand?.("/novo foco")} />
    </div>
  );
}

/** Quick commands row for open state (minus "Resumir") */
function OpenCommands({ onCommand }: { onCommand?: (prompt: string) => void }) {
  return (
    <div className="flex gap-[8px] flex-wrap">
      <QuickCmd label="/ Criar trilha" onClick={() => onCommand?.("/criar uma trilha de aprendizado com meus conteúdos")} />
      <QuickCmd label="/ Novo Foco" gradient onClick={() => onCommand?.("/novo foco")} />
    </div>
  );
}

export const Closed: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const handleCommand = (prompt: string) => {
      setMessages((m) => [...m, { role: "user", content: prompt }]);
      setOpen(true);
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", content: "Entendido! Processando sua solicitação..." }]);
      }, 800);
    };

    return (
      <div style={{ height: "100svh", background: "url(https://picsum.photos/1200/800) center/cover" }}>
        <PromptBar
          open={open}
          onOpenChange={setOpen}
          messages={messages}
          placeholder="Cole um link para salvar..."
          quickCommands={
            open
              ? <OpenCommands onCommand={handleCommand} />
              : <ClosedCommands onCommand={handleCommand} />
          }
          onSubmit={async (msg) => {
            setMessages((m) => [...m, { role: "user", content: msg }]);
            setOpen(true);
            await new Promise((r) => setTimeout(r, 1000));
            setMessages((m) => [
              ...m,
              { role: "assistant", content: `Resposta para: ${msg}` },
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
      { role: "user", content: "O que é o coisas.space?" },
      {
        role: "assistant",
        content:
          "Coisas.space é uma ferramenta de conhecimento pessoal que te ajuda a salvar, organizar e redescobrir links e ideias.",
      },
      { role: "user", content: "Como difere de um gerenciador de bookmarks?" },
      {
        role: "assistant",
        content:
          "Diferente de bookmarks simples, o Coisas adiciona contexto com IA, coleções inteligentes e uma interface de chat para recuperar informações do seu próprio conteúdo salvo.",
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
          placeholder="Continue a conversa..."
          quickCommands={<OpenCommands />}
          onPositionChange={() => {}}
          onSubmit={async (msg) => {
            setMessages((m) => [...m, { role: "user", content: msg }]);
            setLoading(true);
            await new Promise((r) => setTimeout(r, 1500));
            setMessages((m) => [
              ...m,
              { role: "assistant", content: `Entendido! Aqui está minha resposta para: ${msg}` },
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
        messages={[{ role: "user", content: "Qual é o sentido da vida?" }]}
        isLoading
        onStop={() => {}}
        onSubmit={async () => {}}
        placeholder="Gerando..."
        quickCommands={<OpenCommands />}
      />
    </div>
  ),
};

export const SideMode: Story = {
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
      { role: "user", content: "Resumir meus conteúdos recentes" },
      {
        role: "assistant",
        content:
          "Aqui estão os seus 5 conteúdos mais recentes:\n\n• Next.js 15 Full Overview — video sobre as novas features\n• Building Design Systems That Scale — artigo da Smashing Magazine\n• How to Build a Second Brain for Creatives — Medium\n\nO tema comum é produtividade e desenvolvimento de sistemas.",
      },
    ]);

    return (
      <div style={{ height: "100svh", background: "#f0f0f0" }}>
        <PromptBar
          open
          onOpenChange={() => {}}
          messages={messages}
          position="side"
          sidebarWidth={420}
          quickCommands={<OpenCommands />}
          onSubmit={async (msg) => {
            setMessages((m) => [...m, { role: "user", content: msg }]);
            await new Promise((r) => setTimeout(r, 800));
            setMessages((m) => [...m, { role: "assistant", content: `Resposta para: ${msg}` }]);
          }}
          placeholder="Pergunte ou cole um link..."
        />
      </div>
    );
  },
};
