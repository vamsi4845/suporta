"use client";
import { getCountryFlagUrl, getCountryFromTimeZone } from "@/lib/country-utils";
import { statusFilterAtom } from "@/modules/dashboard/atoms";
import { ToggleSidebar } from "@/modules/dashboard/ui/components/toggle-sidebar";
import { api } from "@workspace/backend/_generated/api";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { cn } from "@workspace/ui/lib/utils";
import { usePaginatedQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon, CornerUpLeftIcon, ListIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ConversationsPanel() {
   const statusFilter = useAtomValue(statusFilterAtom);
   const setStatusFilter = useSetAtom(statusFilterAtom);
    const conversations = usePaginatedQuery(api.private.conversations.getMany, {status: statusFilter === "all" ? undefined : statusFilter}, {initialNumItems: 10});
    const {topElementRef, handleLoadMore, canLoadMore, isLoadingMore,isLoadingFirstPage} = useInfiniteScroll({status: conversations.status, loadMore: conversations.loadMore, loadSize: 10});
    const pathname = usePathname();

    const handleStatusChange = (value: Doc<"conversations">["status"] | "all") => {
        setStatusFilter(value as Doc<"conversations">["status"] | "all");
    }
    return (
        <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
            <div className="flex items-center justify-between gap-3.5 border-b p-2">
                <div className="flex items-center gap-0.5">  
                    <ToggleSidebar />
                    <p className="text-sm md:!text-lg font-medium">Inbox</p>
                </div>
                <Select defaultValue="all" onValueChange={handleStatusChange} value={statusFilter}>
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
            {isLoadingFirstPage ? (
                <ConversationsPanelSkeleton />
            ) : (
            <ScrollArea className="max-h-[calc(100vh-53px)]" >
                <div className="flex flex-col text-sm">
                    {conversations.results.map((conversation) => {
                        const isLastMessageFromOperator = conversation.lastMessage?.message?.role !== "user";
                        const country = getCountryFromTimeZone(conversation.contactSession.metadata?.timezone);
                        const countryFlagUrl = country?.code ? getCountryFlagUrl(country.code) : undefined;
                        return (
                            <Link key={conversation._id} href={`/inbox/${conversation._id}`} 
                            className={cn("relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 tex-sm leading-tight hover:bg-accent", pathname === `/inbox/${conversation._id}` && "bg-accent text-accent-foreground")}>
                                    <DicebearAvatar seed={conversation.contactSession._id} badgeImageUrl={countryFlagUrl} size={40} className="shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex w-full items-center gap-2">
                                            <span className="truncate font-bold">
                                                {conversation.contactSession.name}
                                            </span>
                                            <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                                                {formatDistanceToNow(conversation._creationTime)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2 mt-1">
                                            <div className="flex w-0 grow items-center gap-1">
                                                {isLastMessageFromOperator &&(
                                                    <CornerUpLeftIcon className="size-3 shrink-0 text-muted-foreground" />
                                                )}
                                                <span className={cn("line-clamp-1 text-muted-foreground text-xs", !isLastMessageFromOperator && "text-black font-bold")}>
                                                    {conversation.lastMessage?.text}
                                                </span>
                                            </div>
                                            <ConversationStatusIcon status={conversation.status} />
                                        </div>
                                    </div>
                            </Link>
                        )
                    })}
                    <InfiniteScrollTrigger ref={topElementRef} canLoadMore={canLoadMore} isLoadingMore={isLoadingMore} onLoadMore={handleLoadMore} />
                </div>
            </ScrollArea>
            )}
        </div>
    )
}



export function ConversationsPanelSkeleton() {
    return (
        <div className="flex flex-col gap-3.5 border-b p-2">
                    {Array.from({length: 10}).map((_, index) => (
                        <div key={index} className="relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 tex-sm leading-tight">
                            <Skeleton className="size-10 shrink-0 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="flex w-full items-center gap-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="ml-auto h-3 w-16" />
                                </div>
                                <Skeleton className="h-3 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
    )
}