"use client";

import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@workspace/backend/_generated/api";
import { AIConversation, AIConversationContent } from "@workspace/ui/components/ai/conversation";
import { AIInput, AIInputSubmit, AIInputTextarea, AIInputToolbar, AIInputTools } from "@workspace/ui/components/ai/input";
import { AIMessage, AIMessageContent } from "@workspace/ui/components/ai/message";
import { AIResponse } from "@workspace/ui/components/ai/response";
import { Button } from "@workspace/ui/components/button";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { Form, FormField } from "@workspace/ui/components/form";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { useAction, useQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useWidgetCustomization } from "@/modules/widget/hooks/use-widget-customization";

const formSchema = z.object({
    message: z.string().min(1,"Message is required"),
});



export function WidgetChatScreen() {
    const setScreen = useSetAtom(screenAtom);
    const setConversationId = useSetAtom(conversationIdAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const conversationId = useAtomValue(conversationIdAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId!));
    const customization = useWidgetCustomization();
    const conversation = useQuery(api.public.conversations.getOne, {conversationId: conversationId!,contactSessionId: contactSessionId!});

    const messages = useThreadMessages(api.public.messages.getMany, conversation?.threadId && contactSessionId ? {threadId: conversation.threadId, contactSessionId}:"skip", {initialNumItems: 10});

    const {topElementRef, handleLoadMore, canLoadMore, isLoadingMore} = useInfiniteScroll({status: messages.status, loadMore: messages.loadMore,loadSize: 10});

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });
    const createMessage = useAction(api.public.messages.create)
    const [isGenerating, setIsGenerating] = useState(false);

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if(!conversation?.threadId || !contactSessionId) {
        return;
    }
    form.reset();
    setIsGenerating(true);
    try {
        await createMessage({
            threadId: conversation.threadId,
            contactSessionId,
            prompt: values.message,
        });
    } catch (error) {
        console.error(error);
    } finally {
        setIsGenerating(false);
    }
   }

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
                {/* <Button variant="transparent" size="icon">
                    <MenuIcon className="size-4" />
                </Button> */}
            </WidgetHeader>
            <AIConversation>
                <AIConversationContent>
                    <InfiniteScrollTrigger ref={topElementRef} canLoadMore={canLoadMore} isLoadingMore={isLoadingMore} onLoadMore={handleLoadMore} />
                    {toUIMessages(messages.results ?? []).map((message) => (
                        <AIMessage key={message.id} from={message.role === "user" ? "user" : "assistant"}>
                            <AIMessageContent>
                                <AIResponse>
                                    {message.content}
                                </AIResponse>
                                </AIMessageContent>
                                {message.role === "assistant"  && (
                                    <DicebearAvatar imageUrl={customization?.logoUrl || "/logo.svg"} seed="assistant" size={32}/>
                                )}
                        </AIMessage>
                    ))}
                    {isGenerating && (
                        <AIMessage from="assistant">
                            <AIMessageContent>
                                <div className="flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    <span className="text-xs text-muted-foreground">Thinking...</span>
                                </div>
                            </AIMessageContent>
                            <DicebearAvatar imageUrl={customization?.logoUrl || "/logo.svg"} seed="assistant" size={32}/>
                        </AIMessage>
                    )}
                </AIConversationContent>
            </AIConversation>
            <Form {...form}>
                <AIInput className="rounded-none border-x-0 border-b-0" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField disabled={conversation?.status === "resolved"} control={form.control} name="message" render={({field}) => (

                                <AIInputTextarea  disabled={conversation?.status === "resolved"} {...field} onChange={field.onChange} 
                                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                    if(e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        form.handleSubmit(onSubmit)();
                                    }
                                }}
                                placeholder={conversation?.status === "resolved" ? "This Conversation has been resolved" : "Type your message..."}
                                value={field.value}
                                 />
                    )} />
                 <AIInputToolbar>
                    <AIInputTools/>
                    <AIInputSubmit disabled={conversation?.status === "resolved" ||!form.formState.isValid} status="ready" type="submit"/>
                 </AIInputToolbar>
                </AIInput>
            </Form>
        </>
    )
}