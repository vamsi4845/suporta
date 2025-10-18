"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { AlertTriangle, ArrowLeftIcon, Menu, MenuIcon, MessageSquareTextIcon } from "lucide-react";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

export function WidgetChatScreen() {
    const setScreen = useSetAtom(screenAtom);
    const setConversationId = useSetAtom(conversationIdAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const conversationId = useAtomValue(conversationIdAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId!));
    const conversation = useQuery(api.public.conversations.getOne, {conversationId: conversationId!,contactSessionId: contactSessionId!});


    const handleBack = () => {
        setConversationId(null);
        setScreen("selection");
    }

    return (
        <>
            <WidgetHeader className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <Button variant="transparent" size="icon" onClick={handleBack}>
                        <ArrowLeftIcon className="size-4" />
                    </Button>
                    <p className="text-sm font-medium">Chat</p>
                </div>
                <Button variant="transparent" size="icon">
                    <MenuIcon className="size-4" />
                </Button>
            </WidgetHeader>
            <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
                {JSON.stringify(conversation)}
            </div>
        </>
    )
}