import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../src/components/ui/navigation-menu";

const meta: Meta = {
  title: "Components/NavigationMenu",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;

export const Default: StoryObj = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Manifesto</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[320px] text-sm text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground mb-2">Por que isso existe?</p>
              <p>Você salva coisas o tempo todo. Links, vídeos, threads, artigos. "Vou ver depois." Depois nunca chega.</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Preço</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[280px]">
              <p className="font-semibold text-sm mb-1">Grátis</p>
              <p className="text-xs text-muted-foreground mb-3">30 links/mês · 7 interações IA</p>
              <p className="font-semibold text-sm mb-1">Pro — R$19,90/mês</p>
              <p className="text-xs text-muted-foreground">Tudo ilimitado + Foco Time</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Privacidade
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
