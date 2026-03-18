import type { Meta, StoryObj } from "@storybook/react";
import { GlassCard } from "../src/components/glass-card";
import { Button } from "../src/components/ui/button";
import { Badge } from "../src/components/ui/badge";
import { Link, Sparks, Folder, Internet, Hashtag, Timer, OpenBook } from "iconoir-react";

const meta: Meta<typeof GlassCard> = {
  title: "Components/GlassCard",
  component: GlassCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "glass-bg",
      values: [
        { name: "glass-bg", value: "url(https://picsum.photos/1200/800) center/cover" },
        { name: "light", value: "#f5f5f5" },
      ],
    },
  },
};
export default meta;

/** Feature row used inside pricing cards */
function Feature({ icon, text, dim }: { icon: React.ReactNode; text: string; dim?: boolean }) {
  return (
    <li className={`flex items-center gap-2 text-sm ${dim ? "text-[#9c9c9c]" : "text-[#0a0a0a]"}`}>
      <span className="text-[#697282] shrink-0">{icon}</span>
      {text}
    </li>
  );
}

export const Default: StoryObj<typeof GlassCard> = {
  render: () => (
    <GlassCard className="w-[320px]">
      <p className="text-sm font-semibold text-[#171717] mb-1">Resumo semanal</p>
      <p className="text-sm text-[#697282] leading-relaxed">
        Você salvou 12 coisas essa semana. Tema dominante: <strong>Design Systems</strong>.
        Sua taxa de recuperação está em 40%.
      </p>
    </GlassCard>
  ),
};

export const WithHeader: StoryObj<typeof GlassCard> = {
  render: () => (
    <GlassCard
      className="w-[360px]"
      header={
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#171717]">Foco ativo</p>
          <Badge variant="secondary">Pro</Badge>
        </div>
      }
    >
      <p className="text-sm text-[#697282] leading-relaxed">
        Aprender React — 8 links relevantes encontrados na sua biblioteca.
      </p>
    </GlassCard>
  ),
};

export const WithFooter: StoryObj<typeof GlassCard> = {
  render: () => (
    <GlassCard
      className="w-[360px]"
      footer={
        <Button className="w-full rounded-[12px]">Assinar Pro</Button>
      }
    >
      <p className="text-sm font-semibold text-[#171717] mb-2">Limite atingido</p>
      <p className="text-sm text-[#697282]">
        Você usou suas 7 interações de IA deste mês. Faça upgrade para IA ilimitada.
      </p>
    </GlassCard>
  ),
};

export const PricingCards: StoryObj = {
  name: "Pricing Cards (2-column)",
  render: () => (
    <GlassCard
      className="w-[640px]"
      header={
        <p className="text-base font-semibold text-[#171717]">Planos</p>
      }
      footer={
        <div className="bg-white rounded-[12px] px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0a0a0a]">Só precisa de mais IA?</p>
            <p className="text-xs text-[#697282]">R$4,90 = 50 interações · não expira</p>
          </div>
          <Button variant="outline" size="sm">Comprar créditos</Button>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        {/* Free */}
        <div className="rounded-2xl border border-gray-200/80 p-5 flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-[#697282] mb-1">Grátis</p>
            <p className="text-2xl font-bold text-[#0a0a0a]">R$0</p>
          </div>
          <ul className="flex flex-col gap-2 flex-1">
            <Feature icon={<Link className="w-3.5 h-3.5" />} text="Até 30 links/mês" />
            <Feature icon={<Sparks className="w-3.5 h-3.5" />} text="7 interações IA" />
            <Feature icon={<Folder className="w-3.5 h-3.5" />} text="1 coleção" />
            <Feature icon={<Internet className="w-3.5 h-3.5" />} text="1 link público" />
            <Feature icon={<Hashtag className="w-3.5 h-3.5" />} text="Categorias IA" />
            <Feature icon={<OpenBook className="w-3.5 h-3.5" />} text="Export → NotebookLM" />
          </ul>
          <button disabled className="w-full rounded-xl border border-gray-200 py-2.5 text-sm text-[#697282] opacity-60 cursor-not-allowed">
            Plano atual
          </button>
        </div>

        {/* Pro */}
        <div className="rounded-2xl border border-[#0a0a0a] p-5 flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-[#0a0a0a] mb-1">Pro</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold text-[#0a0a0a]">R$19,90</p>
              <span className="text-sm text-[#697282]">/mês</span>
            </div>
          </div>
          <ul className="flex flex-col gap-2 flex-1">
            <Feature icon={<Link className="w-3.5 h-3.5" />} text="Links ilimitados" />
            <Feature icon={<Sparks className="w-3.5 h-3.5" />} text="IA ilimitada" />
            <Feature icon={<Folder className="w-3.5 h-3.5" />} text="Coleções ilimitadas" />
            <Feature icon={<Internet className="w-3.5 h-3.5" />} text="Links públicos ilimitados" />
            <Feature icon={<Hashtag className="w-3.5 h-3.5" />} text="Categorias IA" />
            <Feature icon={<Timer className="w-3.5 h-3.5" />} text="Foco Time" />
            <Feature icon={<OpenBook className="w-3.5 h-3.5" />} text="Export → NotebookLM" />
            <Feature icon={<OpenBook className="w-3.5 h-3.5" />} text="Emails → Conteúdo" dim />
          </ul>
          <Button className="w-full rounded-xl">Assinar Pro</Button>
        </div>
      </div>
    </GlassCard>
  ),
};
