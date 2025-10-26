"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { AlertTriangle, ArrowLeftIcon, Menu, MenuIcon, MessageSquareTextIcon } from "lucide-react";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { useAction, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import {AIConversation,AIConversationContent,AIConversationScrollButton} from "@workspace/ui/components/ai/conversation";
import {AIMessage,AIMessageContent} from "@workspace/ui/components/ai/message";
import {AIInput,AIInputButton,AIInputSubmit,AIInputTextarea,AIInputTextareaProps, AIInputToolbar, AIInputTools} from "@workspace/ui/components/ai/input";
import {AIResponse} from "@workspace/ui/components/ai/response";
import {AISuggestions,AISuggestion} from "@workspace/ui/components/ai/suggestion";
import {useThreadMessages,toUIMessages} from "@convex-dev/agent/react";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@workspace/ui/components/form";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { DicebarAvatar } from "@workspace/ui/components/dicebar-avatar";

const formSchema = z.object({
    message: z.string().min(1,"Message is required"),
});



export function WidgetChatScreen() {
    const setScreen = useSetAtom(screenAtom);
    const setConversationId = useSetAtom(conversationIdAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const conversationId = useAtomValue(conversationIdAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId!));
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

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if(!conversation?.threadId || !contactSessionId) {
        return;
    }
    form.reset();
    await createMessage({
        threadId: conversation.threadId,
        contactSessionId,
        prompt: values.message,
    });
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
                <Button variant="transparent" size="icon">
                    <MenuIcon className="size-4" />
                </Button>
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
                                    <DicebarAvatar imageUrl="/logo.svg" seed="assistant" size={32}/>
                                )}
                        </AIMessage>
                    ))}
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