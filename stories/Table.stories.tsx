import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../src/components/ui/table";
import { Badge } from "../src/components/ui/badge";

const meta: Meta = {
  title: "Components/Table",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

const links = [
  { title: "Building Design Systems That Scale", domain: "smashingmagazine.com", category: "Design", saved: "Hoje" },
  { title: "How to Build a Second Brain for Creatives", domain: "medium.com", category: "Produtividade", saved: "Ontem" },
  { title: "Next.js 15 — Full Overview", domain: "youtube.com", category: "Dev", saved: "2d atrás" },
  { title: "The Art of Prompt Engineering", domain: "openai.com", category: "IA", saved: "3d atrás" },
];

export const Default: StoryObj = {
  render: () => (
    <Table>
      <TableCaption>Seus links salvos recentemente</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Domínio</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="text-right">Salvo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links.map((link) => (
          <TableRow key={link.title}>
            <TableCell className="font-medium max-w-[240px] truncate">{link.title}</TableCell>
            <TableCell className="text-muted-foreground text-xs">{link.domain}</TableCell>
            <TableCell><Badge variant="secondary">{link.category}</Badge></TableCell>
            <TableCell className="text-right text-xs text-muted-foreground">{link.saved}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
