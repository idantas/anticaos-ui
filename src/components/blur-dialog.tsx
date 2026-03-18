"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Xmark } from "iconoir-react";
import { cn } from "../lib/utils";

/**
 * BlurDialog — blurs the page behind the overlay, content is a solid white container.
 * Contrast with GlassDialog where the content box itself is glass.
 */

export interface BlurDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
  /** Show the default close button in the top-right corner */
  showClose?: boolean;
  className?: string;
}

export function BlurDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  maxWidth = "480px",
  showClose = true,
  className,
}: BlurDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Blurred overlay */}
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50",
            "bg-black/20 backdrop-blur-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />

        {/* Solid white content container */}
        <DialogPrimitive.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-50",
            "-translate-x-1/2 -translate-y-1/2",
            "w-full bg-white rounded-[20px] p-6",
            "border border-[#e9e9e9]",
            "shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]",
            "max-h-[80vh] overflow-y-auto",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "duration-200 focus:outline-none",
            className,
          )}
          style={{ maxWidth, width: "calc(100vw - 2rem)" }}
        >
          {(title || showClose) && (
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                {title && (
                  <DialogPrimitive.Title className="font-semibold text-[18px] text-[#0a0a0a] leading-snug">
                    {title}
                  </DialogPrimitive.Title>
                )}
                {description && (
                  <DialogPrimitive.Description className="text-[14px] text-[#0a0a0a]/60 leading-[1.6] mt-1">
                    {description}
                  </DialogPrimitive.Description>
                )}
              </div>
              {showClose && (
                <DialogPrimitive.Close className="ml-4 shrink-0 size-5 flex items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a]/70 transition-colors rounded-sm">
                  <Xmark className="w-4 h-4" />
                  <span className="sr-only">Fechar</span>
                </DialogPrimitive.Close>
              )}
            </div>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const BlurDialogTrigger = DialogPrimitive.Trigger;
