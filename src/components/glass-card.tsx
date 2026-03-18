"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { glassStyle } from "./glass-dialog";

export interface GlassCardProps {
  /** Content rendered inside the white inner container */
  children: React.ReactNode;
  /** Optional header rendered above the white container, inside the glass layer */
  header?: React.ReactNode;
  /** Optional footer rendered below the white container, inside the glass layer */
  footer?: React.ReactNode;
  /** className applied to the outer glass wrapper */
  className?: string;
  /** className applied to the inner white container */
  contentClassName?: string;
  /** Padding inside the white content area (default: "20px") */
  contentPadding?: string;
}

/**
 * GlassCard — outer glass container + inner solid-white content area.
 *
 * Same two-layer visual as the public popovers on Coisas.space:
 * - Outer: glassmorphism (gradient + backdrop-blur + shadow + border)
 * - Inner: solid white with rounded corners
 *
 * @example
 * <GlassCard>
 *   <p>Content here</p>
 * </GlassCard>
 *
 * @example
 * <GlassCard
 *   header={<p className="text-sm font-semibold text-[#171717]">Título</p>}
 *   footer={<Button className="w-full">Ação</Button>}
 * >
 *   <p>Content here</p>
 * </GlassCard>
 */
export function GlassCard({
  children,
  header,
  footer,
  className,
  contentClassName,
  contentPadding = "20px",
}: GlassCardProps) {
  return (
    <div
      style={{ ...glassStyle, padding: "8px" }}
      className={cn("flex flex-col gap-2", className)}
    >
      {header && (
        <div className="px-2 pt-1 shrink-0">{header}</div>
      )}

      <div
        className={cn(
          "bg-white rounded-[16px] flex-1",
          contentClassName,
        )}
        style={{ padding: contentPadding }}
      >
        {children}
      </div>

      {footer && (
        <div className="shrink-0">{footer}</div>
      )}
    </div>
  );
}
