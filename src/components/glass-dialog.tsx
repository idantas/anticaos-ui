"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Xmark } from "iconoir-react";
import { Drawer, DrawerContent, DrawerTitle } from "./ui/drawer";
import { glassStyle } from "../lib/glass";

export { glassStyle };

export interface GlassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
  /** Show the default close button in the top-right corner (default: true) */
  showClose?: boolean;
  className?: string;
}

export function GlassDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  maxWidth = "520px",
  showClose = true,
  className,
}: GlassDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ background: "rgba(0,0,0,0.08)" }}
        />
        <DialogPrimitive.Content
          className={`fixed top-[50%] left-[50%] z-50 w-full max-h-[80vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 focus:outline-none${className ? ` ${className}` : ""}`}
          style={{ ...glassStyle, maxWidth, width: "calc(100vw - 2rem)" }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <DialogPrimitive.Title className="font-semibold text-base text-[#171717] leading-snug">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="text-[14px] text-[#0a0a0a]/60 leading-[1.6] mt-1">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            {showClose && (
              <DialogPrimitive.Close
                aria-label="Fechar"
                className="ml-4 shrink-0 size-5 flex items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a]/70 transition-colors rounded-sm"
              >
                <Xmark className="w-4 h-4" aria-hidden />
              </DialogPrimitive.Close>
            )}
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export interface GlassBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export function GlassBottomSheet({
  open,
  onOpenChange,
  title,
  children,
}: GlassBottomSheetProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent
        className="max-h-[85vh] overflow-hidden flex flex-col rounded-t-[20px] border-0"
        style={glassStyle}
      >
        <div className="flex items-center justify-between p-4 pb-2 shrink-0">
          <DrawerTitle className="font-semibold text-base text-[#171717] leading-snug">
            {title}
          </DrawerTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Fechar"
            className="size-5 flex items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a]/70 transition-colors rounded-sm"
          >
            <Xmark className="w-4 h-4" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2 min-h-0">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export interface GlassPopoverContentProps
  extends React.ComponentProps<typeof PopoverPrimitive.Content> {
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  onOpenChange?: (open: boolean) => void;
}

export function GlassPopoverContent({
  title,
  children,
  maxWidth = "520px",
  onOpenChange,
  className,
  align = "start",
  side = "bottom",
  sideOffset = 8,
  ...props
}: GlassPopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={`p-6 max-h-[80vh] overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 duration-200 focus:outline-none ${className ?? ""}`}
        style={{ ...glassStyle, maxWidth, width: "calc(100vw - 2rem)", zIndex: 9999 }}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base text-[#171717] leading-snug">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange?.(false)}
            aria-label="Fechar"
            className="size-5 flex items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a]/70 transition-colors rounded-sm"
          >
            <Xmark className="w-4 h-4" aria-hidden />
          </button>
        </div>
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
