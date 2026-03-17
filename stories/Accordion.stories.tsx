import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../src/components/ui/accordion";

const meta: Meta = {
  title: "Components/Accordion",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="w-[480px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>O que é o Coisas.space?</AccordionTrigger>
          <AccordionContent>
            Uma biblioteca visual de conteúdos pessoal com IA integrada — transforma o que você salva no que você aprende.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Como funciona a categorização automática?</AccordionTrigger>
          <AccordionContent>
            Ao salvar um link, a IA analisa o conteúdo e sugere uma categoria. Você pode aceitar ou editar a sugestão.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Posso exportar meus dados?</AccordionTrigger>
          <AccordionContent>
            Sim. O plano Pro inclui exportação para NotebookLM e outros formatos. Seus dados pertencem só a você.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Multiple: StoryObj = {
  render: () => (
    <div className="w-[480px]">
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Plano Grátis</AccordionTrigger>
          <AccordionContent>
            30 links/mês · 7 interações IA · 1 coleção · 1 link público
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Plano Pro — R$19,90/mês</AccordionTrigger>
          <AccordionContent>
            Links ilimitados · IA ilimitada · Coleções ilimitadas · Foco Time · Export NotebookLM
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
