"use client";

import { cn } from "@workspace/ui/lib/utils";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface WidgetCustomization {
  buttonColor: string;
  position: "bottom-right" | "bottom-left";
  logoUrl: string;
  primaryColor: string;
  backgroundColor: string;
}

interface Props {
  organizationId: string | null;
  customization: WidgetCustomization;
  previewUrl: string;
}

export function WidgetPreview({ organizationId, customization, previewUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!organizationId) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-lg border bg-muted">
        <p className="text-muted-foreground">Select an organization to preview</p>
      </div>
    );
  }

  const positionClass = customization.position === "bottom-right" ? "right-5" : "left-5";
  const buttonColor = customization.buttonColor || "#3b82f6";
  
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1] || "0", 16),
          g: parseInt(result[2] || "0", 16),
          b: parseInt(result[3] || "0", 16),
        }
      : { r: 59, g: 130, b: 246 };
  };

  const rgb = hexToRgb(buttonColor);
  const shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`;

  const backgroundColor = customization.backgroundColor || "#ffffff";

  return (
    <div
      className={cn(
        "relative h-[600px] w-full overflow-hidden rounded-lg border"
      )}
      style={{
        minHeight: "600px",
        backgroundColor: "white",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "absolute bottom-5 z-10 flex h-[60px] w-[60px] items-center justify-center rounded-full border-none transition-all hover:scale-105 cursor-pointer",
          positionClass
        )}
        style={{
          backgroundColor: buttonColor,
          boxShadow: `0 4px 24px ${shadowColor}`,
        }}
      >
            {customization.logoUrl ? (
              <Image
                src={customization.logoUrl}
                alt="Widget logo"
                width={32}
                height={32}
                className="object-contain"
              />
            ) : (
              <MessageSquare  className="size-5 text-white" />
            )}
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute bottom-[90px] z-[9] h-[500px] w-[400px] max-w-[calc(100%-40px)] max-h-[calc(100%-110px)] overflow-hidden rounded-2xl border shadow-lg",
            positionClass
          )}
        >
          <iframe
            src={previewUrl}
            className="h-full w-full border-none"
            allow="microphone; clipboard-read; clipboard-write"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      )}

      {!isLoaded && isOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
          <div className="text-center space-y-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="text-sm text-muted-foreground">Loading widget...</p>
          </div>
        </div>
      )}
    </div>
  );
}

