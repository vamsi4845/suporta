"use client";

import { useCommandState } from "cmdk";
import type { LucideProps } from "lucide-react";
import {
  CornerDownLeftIcon,
  MoonStarIcon,
  SunIcon,
  SunMoonIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@workspace/ui/components/command";
import { cn } from "@workspace/ui/lib/utils";
import { Separator } from "@workspace/ui/components/separator";
import { Button } from "@workspace/ui/components/button";
import { useSidebar } from "@workspace/ui/components/sidebar";

type CommandLinkItem = {
  title: string;
  href: string;

  icon?: React.ComponentType<LucideProps>;
  iconImage?: string;
  keywords?: string[];
  openInNewTab?: boolean;
};

const NAVIGATION_LINKS: CommandLinkItem[] = [
  {
    title: "Inbox",
    href: "/inbox",
    iconImage: "/msgs.svg",
    keywords: ["messages", "chat", "conversation"],
  },
  {
    title: "Content",
    href: "/content",
    iconImage: "/book-open.svg",
    keywords: ["files", "documents", "knowledge", "docs"],
  },
  {
    title: "Integrations",
    href: "/integrations",
    iconImage: "/code-editor.svg",
    keywords: ["integrate", "connect", "api"],
  },
  {
    title: "Customization",
    href: "/customization",
    iconImage: "/magic-wand-sparkle.svg",
    keywords: ["widget", "customize", "settings", "config"],
  },
];

export function CommandMenu() {
  const router = useRouter();

  const { setTheme } = useTheme();
  const { state } = useSidebar();

  const [open, setOpen] = useState(false);
  const isSidebarOpen = state === "expanded";
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
          if (
            (e.target instanceof HTMLElement && e.target.isContentEditable) ||
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLSelectElement
          ) {
            return;
          }

          e.preventDefault();
          setOpen((open) => !open);
        }
      },
      { signal }
    );

    return () => abortController.abort();
  }, []);

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false);

      if (openInNewTab) {
        window.open(href, "_blank", "noopener");
      } else {
        router.push(href);
      }
    },
    [router]
  );

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      setOpen(false);
      setTheme(theme);

      // if (!document.startViewTransition) {
      //   setTheme(theme);
      //   return;
      // }

      // document.startViewTransition(() => setTheme(theme));
    },
    [setTheme]
  );
  return (
    <>
      <Button
        variant="secondary"
        className="h-8 gap-1.5 rounded-xl border bg-zinc-50 px-2.5 text-muted-foreground select-none hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-900"
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          aria-hidden
        >
          <path
            d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>

        {isSidebarOpen && (
        <span className="font-sans text-sm/4 font-medium">
          Search
        </span>
        )}

        {isSidebarOpen && (
          <CommandMenuKbd className="hidden tracking-wider sm:in-[.os-macos_&]:flex">
            ⌘K
          </CommandMenuKbd>
        )}
        {isSidebarOpen && (
          <CommandMenuKbd className="hidden sm:not-[.os-macos_&]:flex">
            Ctrl K
          </CommandMenuKbd>
        )}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />

        <CommandList className="min-h-80">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandLinkGroup
            heading="Navigation"
            links={NAVIGATION_LINKS}
            onLinkSelect={handleOpenLink}
          />

          {/* <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("light")}
            >
              <SunIcon />
              Light
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("dark")}
            >
              <MoonStarIcon />
              Dark
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("system")}
            >
              <SunMoonIcon />
              Auto
            </CommandItem>
          </CommandGroup> */}
        </CommandList>

        <CommandMenuFooter />
      </CommandDialog>
    </>
  );
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkSelect,
}: {
  heading: string;
  links: CommandLinkItem[];
  fallbackIcon?: React.ComponentType<LucideProps>;
  onLinkSelect: (href: string, openInNewTab?: boolean) => void;
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const Icon = link?.icon ?? fallbackIcon ?? React.Fragment;

        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <Image
                className="rounded-sm"
                src={link.iconImage}
                alt={link.title}
                width={16}
                height={16}
                unoptimized
              />
            ) : (
              <Icon />
            )}
            {link.title}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

type CommandKind = "command" | "page" | "link";

type CommandMetaMap = Map<
  string,
  {
    commandKind: CommandKind;
  }
>;

function buildCommandMetaMap() {
  const commandMetaMap: CommandMetaMap = new Map();

  NAVIGATION_LINKS.forEach((item) => {
    commandMetaMap.set(item.title, {
      commandKind: "page",
    });
  });

  commandMetaMap.set("Light", { commandKind: "command" });
  commandMetaMap.set("Dark", { commandKind: "command" });
  commandMetaMap.set("Auto", { commandKind: "command" });

  return commandMetaMap;
}

const COMMAND_META_MAP = buildCommandMetaMap();

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  command: "Run Command",
  page: "Go to Page",
  link: "Open Link",
};

function CommandMenuFooter() {
  const selectedCommandKind = useCommandState(
    (state) => COMMAND_META_MAP.get(state.value)?.commandKind ?? "page"
  );

  return (
    <>
      <div className="flex h-10" />

      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 border-t bg-zinc-100/30 px-4 text-xs font-medium dark:bg-zinc-800/30">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="logo"
            width={20}
            height={20}
            className="text-muted-foreground"
            aria-hidden
          />
          <h5 className="text-sm font-bold">Suporta</h5>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span>{ENTER_ACTION_LABELS[selectedCommandKind]}</span>
          <CommandMenuKbd>
            <CornerDownLeftIcon />
          </CommandMenuKbd>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <span className="text-muted-foreground">Exit</span>
          <CommandMenuKbd>Esc</CommandMenuKbd>
        </div>
      </div>
    </>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 min-w-6 items-center justify-center gap-1 rounded-sm bg-black/5 px-1 font-sans text-[13px] font-normal text-muted-foreground shadow-[inset_0_-1px_2px] shadow-black/10 select-none dark:bg-white/10 dark:shadow-white/10 dark:text-shadow-xs [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  );
}


