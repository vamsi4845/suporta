"use client";

import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetFooter } from "@/modules/widget/ui/components/widget-footer";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { usePaginatedQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";

export function WidgetInboxScreen() {
    const setScreen = useSetAtom(screenAtom);
    const setConversationId = useSetAtom(conversationIdAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId!));
    const conversations = usePaginatedQuery(api.public.conversations.getMany, contactSessionId ? {contactSessionId}:"skip", {initialNumItems: 10});



    const {topElementRef, handleLoadMore, canLoadMore, isLoadingMore} = useInfiniteScroll({status: conversations.status, loadMore: conversations.loadMore,loadSize: 10});


    const handleBack = () => {
        setScreen("selection");
    }

    const handleConversationClick = (conversationId: Id<"conversations">) => {
        setScreen("chat");
        setConversationId(conversationId);
    }

    return (
        <>
            <WidgetHeader>
                <div className="flex items-center gap-x-2">
                    <Button variant="transparent" size="icon" onClick={handleBack}>
                        <ArrowLeftIcon className="size-4" />
                    </Button>
                    <p className="text-sm font-medium">Inbox</p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col gap-y-2 p-4 overflow-y-auto">
                {conversations?.results.map((conversation) => (
                    <Button key={conversation._id} variant="outline" size="icon" onClick={() => handleConversationClick(conversation._id)} className="w-full justify-between h-20">
                        <div className="flex w-full flex-col gap-4 overflow-hidden text-start p-3">
                        <div className="flex w-full items-center justify-between gap-x-2">
                            <p className="text-muted-foreground text-xs">Chat</p>
                            <p className="text-muted-foreground text-xs">{formatDistanceToNow(new Date(conversation._creationTime))}</p>
                        </div>
                        <div className="flex w-full items-center justify-between gap-x-2">
                            <p className="text-sm font-medium truncate">{conversation.lastMessage?.text}</p>
                            <ConversationStatusIcon status={conversation.status} />
                        </div>
                        </div>
                    </Button>
                ))}
                <InfiniteScrollTrigger ref={topElementRef} canLoadMore={canLoadMore} isLoadingMore={isLoadingMore} onLoadMore={handleLoadMore} />
            </div>
            <WidgetFooter />
        </>
    )
}