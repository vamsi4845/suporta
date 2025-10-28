"use client";
import { Select, SelectTrigger, SelectValue,SelectItem,SelectContent } from "@workspace/ui/components/select";
import { ListIcon,ArrowRightIcon,CheckIcon, ArrowUpIcon } from "lucide-react";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { useState } from "react";
import { api } from "@workspace/backend/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { getCountryFromTimeZone } from "@/lib/country-utils";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/navigation";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";

export function ConversationsPanel() {

    const conversations = usePaginatedQuery(api.private.conversations.getMany, {status: undefined}, {initialNumItems: 10});
    console.log("conversations", conversations.results);
    const pathname = usePathname();

    const handleStatusChange = (value: string) => {
        // setStatus(value);
    }
    return (
        <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
            <div className="flex flex-col gap-3.5 border-b p-2">
                <Select defaultValue="all" onValueChange={handleStatusChange} value="all">
                    <SelectTrigger className="h-8 border-none px-1.5 shadow-none ring-0 hover:bg-accent hover:text-accent-foreground focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            <div className="flex items-center gap-2">
                                <ListIcon className="size-4" />
                                <span>All</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="unresolved">
                            <div className="flex items-center gap-2">
                                <ArrowRightIcon className="size-4" />
                                <span>Unresolved</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="escalated">
                            <div className="flex items-center gap-2">
                                <ArrowUpIcon className="size-4" />
                                <span>Escalated</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="resolved">
                            <div className="flex items-center gap-2">
                                <CheckIcon className="size-4" />
                                <span>Resolved</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <ScrollArea className="max-h-[calc(100vh-53px)]">
                <div className="flex flex-col text-sm">
                    {conversations.results.map((conversation) => {
                        const isLastMessageFromOperator = conversation.lastMessage?.message?.role !== "user";
                        const country = getCountryFromTimeZone(conversation.contactSession.metadata?.timezone);
                        const countryFlagUrl ="/logo.svg"
                        return (
                            <Link key={conversation._id} href={`/conversations/${conversation._id}`} 
                            className={cn("relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 tex-sm leading-tight hover:bg-accent", pathname === `/conversations/${conversation._id}` && "bg-accent text-accent-foreground")}>
                                <div className={cn("-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-neutral-300 opacity-0 transition-opacity",
                                    pathname === `/conversations/${conversation._id}` && "opacity-100")}/>
                                    <DicebearAvatar seed={conversation.contactSession._id} size={40} className="shrink-0" />
                            </Link>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}