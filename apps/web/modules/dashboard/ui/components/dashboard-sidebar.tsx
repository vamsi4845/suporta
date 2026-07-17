"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommandMenu } from "./command-menu";

interface NavItem {
    title: string;
    url: string;
    icon: string;
}

const navItems: NavItem[] = [
    {
        title: "Inbox",
        url: "/inbox",
        icon: "/msgs.svg",
    },
    {
        title: "Content",
        url: "/content",
        icon: "/book-open.svg",
    },
    {
        title: "Integrations",
        url: "/integrations",
        icon: "/code-editor.svg",
    },
    {
        title: "Customization",
        url: "/customization",
        icon: "/magic-wand-sparkle.svg",
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: "/analytics-icon.svg",
    },
]

export function DashboardSidebar(){
    const pathname = usePathname();

    const isActive = (url: string) => {
        if(url === "/") return pathname === url;
        return pathname.startsWith(url);
    };
    return (
        <Sidebar className="group" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                        <Link href="/inbox" className="flex items-center gap-2.5 py-1">
                            <Image src="/logo.svg" alt="logo" width={28} height={28} className="shrink-0"/>
                            <span className="text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">Suporta</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <CommandMenu/>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const active = isActive(item.url);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                            isActive={active}
                                            className={cn(
                                                "rounded-lg text-sidebar-foreground/70 transition-colors",
                                                active && "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs border border-sidebar-border font-medium"
                                            )}
                                        >
                                            <Link href={item.url}>
                                                <Image src={item.icon} alt={item.title} width={20} height={20} className="shrink-0"/>
                                                <span className="text-sm">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                        <OrganizationSwitcher
                            hidePersonal
                            appearance={{
                                elements: {
                                    rootBox: "w-full!",
                                    organizationSwitcherTrigger:
                                        "w-full! justify-start! rounded-lg! p-2! text-sidebar-foreground! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground!",
                                },
                            }}
                        />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <UserButton showName appearance={{
                            elements:{
                                rootBox:"w-full! h-8!",
                                userButtonTrigger:"w-full! p-2! rounded-lg! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
                                userButtonBox:"w-full! flex-row-reverse! justify-end! gap-2! group-data[collapsible=icon]:justify-center! text-sidebar-foreground!",
                                userButtonOuterIdentifier:"pl-0! group-data-[collapsible=icon]:hidden!",
                                avatarBox:"size-4!"
                            }
                        }} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
