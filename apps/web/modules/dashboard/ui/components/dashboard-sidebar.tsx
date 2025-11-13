"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommandMenu } from "./command-menu";


const navItems =[
    {
        title: "Inbox",
        url: "/inbox",
        icon: "/msgs.svg"
    },
    {
        title: "Content",
        url: "/content",
        icon: "/book-open.svg"
    },
    {
        title: "Integrations",
        url: "/integrations",
        icon:"/code-editor.svg"
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
                        <div className="flex items-center gap-2 py-1">
                            <Image src="/logo.svg" alt="logo" width={32} height={32}/>
                            <h2 className="text-2xl font-bold">Suporta</h2>
                        </div>
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
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems?.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild disabled={item.title === "Analytics"} tooltip={item.title} isActive={isActive(item.url)} className={cn(isActive(item.url) && "bg-background border border-sidebar-border text-background rounded-xl")}>
                                        <Link href={item.url} className={cn(item.title === "Analytics" && "pointer-events-none opacity-80")}>
                                            <Image src={item.icon} alt={item.title} width={24} height={24}/>
                                            <span>{item.title} {item.title === "Analytics" && <span className="text-xs text-muted-foreground">(soon)</span>}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserButton showName appearance={{
                            elements:{
                                rootBox:"w-full! h-8!",
                                userButtonTrigger:"w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
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