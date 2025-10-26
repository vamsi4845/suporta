"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { ChevronRightIcon, MessageSquareTextIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { contactSessionIdAtomFamily, conversationIdAtom, errorMessageAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { WidgetFooter } from "@/modules/widget/ui/components/widget-footer";

export function WidgetSelectionScreen() {
    const setScreen = useSetAtom(screenAtom);
    const setErrorMessage = useSetAtom(errorMessageAtom);
    const setConversationId = useSetAtom(conversationIdAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId!));
    const createConversation = useMutation(api.public.conversations.create);
    const [isPending, setIsPending] = useState(false);


    const handleNewConversation = async () => {
        if(!organizationId || !contactSessionId) {
            setErrorMessage( contactSessionId ? "Invalid session":"Organization ID is required");
            setScreen(contactSessionId ? "error":"auth");
            return;
        }

        setIsPending(true);
        try {
            const conversationId = await createConversation({organizationId,contactSessionId,});
            setConversationId(conversationId);
            setScreen("chat");
        } catch {
            setScreen("auth");
        }
        setIsPending(false);
    }

    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-2 px-2 py-6 font-semibold">
                    <p className="text-3xl ">
                    Hi, there!
                    </p>
                    <p className="text-lg">
                        How can we help you today?
                    </p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col items-center gap-y-4 p-4 overflow-y-auto">
                <Button disabled={isPending} variant="outline" className="w-full h-16 justify-between" onClick={handleNewConversation}>
                    <div className="flex items-center gap-x-2">
                        <MessageSquareTextIcon className="size-4" />
                        <span>Start Chat</span>
                    </div>
                    <ChevronRightIcon className="size-4" />
                </Button>
            </div>
            <WidgetFooter />
        </>
    )
}