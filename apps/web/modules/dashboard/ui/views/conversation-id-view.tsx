"use client";

import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@workspace/backend/_generated/api";
import { Doc, Id } from "@workspace/backend/_generated/dataModel";
import { AIConversation, AIConversationContent, AIConversationScrollButton } from "@workspace/ui/components/ai/conversation";
import { AIInput, AIInputButton, AIInputSubmit, AIInputTextarea, AIInputToolbar, AIInputTools } from "@workspace/ui/components/ai/input";
import { AIMessage, AIMessageContent } from "@workspace/ui/components/ai/message";
import { AIResponse } from "@workspace/ui/components/ai/response";
import { Button } from "@workspace/ui/components/button";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { Form, FormField } from "@workspace/ui/components/form";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { useAction, useMutation, useQuery } from "convex/react";
import { MoreHorizontalIcon, SendIcon, Wand2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConversationStatusButton } from "@/modules/dashboard/ui/components/conversation-status-button";
import { useState } from "react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";


const formSchema = z.object({
    message:z.string().min(1,"Message is required")
})



export function ConversationIdView({conversationId}: {conversationId: Id<"conversations">}) {
    const router = useRouter();
    const conversation = useQuery(api.private.conversations.getOne, {conversationId});
    const messages = useThreadMessages(api.private.messages.getMany, conversation?.threadId ? {threadId: conversation.threadId}:"skip", {initialNumItems: 10});
    const {topElementRef, handleLoadMore, canLoadMore, isLoadingMore} = useInfiniteScroll({status: messages.status, loadMore: messages.loadMore,loadSize: 10});
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isEnhancingResponse, setIsEnhancingResponse] = useState(false);
    const enhanceResponse = useAction(api.private.messages.enhanceResponse);
    const createMessage = useMutation(api.private.messages.create);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        try {
            await createMessage({conversationId: conversationId,prompt: values.message,});
            form.reset();
        } catch (error) {
            console.error(error);
        }
    }
    const updateConversationStatus = useMutation(api.private.conversations.updateStatus);
    const handleUpdateStatus = async () => {
        if(!conversation) return;
        let newStatus : "unresolved" | "escalated" | "resolved";
        if(conversation.status === "unresolved") {
            newStatus = "escalated";
        } else if(conversation.status === "escalated") {
            newStatus = "resolved";
        } else{
            newStatus = "unresolved";
        }
        try {
            setIsUpdatingStatus(true);
            await updateConversationStatus({conversationId,status: newStatus});
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdatingStatus(false);
        }
    }
    const handleEnhanceResponse = async (prompt: string) => {
        try {
            setIsEnhancingResponse(true);
            const response = await enhanceResponse({prompt});
            form.setValue("message", response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsEnhancingResponse(false);
        }
    }
    if(conversation === undefined || messages.status === "LoadingFirstPage"){
        return <ConversationIdViewSkeleton />;
    }
    return (
        <div className="flex h-full flex-col bg-muted">
            <header className="flex items-center justify-end border-b bg-background p-2.5">
                {conversation && (
                    <ConversationStatusButton status={conversation?.status ?? "unresolved"} onClick={handleUpdateStatus} disabled={isUpdatingStatus} />
                )}
            </header>
            <AIConversation className="max-h-[calc(100vh-180px)]">
                <AIConversationContent>
                    <InfiniteScrollTrigger ref={topElementRef} canLoadMore={canLoadMore} isLoadingMore={isLoadingMore} onLoadMore={handleLoadMore} />
                    {toUIMessages(messages.results ?? []).map((message) => (
                        <AIMessage key={message.id} from={message.role === "user" ? "assistant" : "user"}>
                            <AIMessageContent>
                                <AIResponse>
                                    {message.content}
                                </AIResponse>
                            </AIMessageContent>
                            {message.role === "user" && (
                                <DicebearAvatar seed={conversation?.contactSession._id ?? "user"} size={32}/>
                            )}
                        </AIMessage>
                    ))}
                </AIConversationContent>
                <AIConversationScrollButton/>
            </AIConversation>
            <div className="p-2">
                <Form {...form}>
                    <AIInput onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name="message" disabled={conversation?.status === "resolved"} render={({field}) => (
                            <AIInputTextarea {...field} disabled={conversation?.status === "resolved" || form.formState.isSubmitting || isEnhancingResponse} onChange={field.onChange} onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                if(e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    form.handleSubmit(onSubmit)();
                                }
                            }} placeholder={conversation?.status === "resolved" ? "This Conversation has been resolved" : "Type your response as an operator..."} />
                        )} />
                        <AIInputToolbar>
                            <AIInputTools>
                            <AIInputButton disabled={conversation?.status === "resolved" || isEnhancingResponse || !form.formState.isValid} onClick={() => handleEnhanceResponse(form.getValues("message"))}>
                                <Wand2Icon/>
                                {isEnhancingResponse ? "Enhancing..." : "Enhance"}
                            </AIInputButton>
                            </AIInputTools>
                            <AIInputSubmit disabled={!form.formState.isValid || conversation?.status === "resolved" || isEnhancingResponse} status="ready" type="submit"/>
                        </AIInputToolbar>
                    </AIInput>
                </Form>
            </div>
        </div>
    )
}



export function ConversationIdViewSkeleton() {
    return (
        <div className="flex h-full flex-col bg-muted">
                <header className="flex items-center justify-between border-b bg-background p-2.5">
                <Button size="sm" variant="ghost">
                    <MoreHorizontalIcon/>
                </Button>
            </header>
            <AIConversation className="max-h-[calc(100vh-180px)]">
                <AIConversationContent>
                   {Array.from({length: 10}).map((_, index) => {
                    const isUser = index % 2 === 0;
                    const widths = ["w-48","w-60","w-72","w-80"]
                    const widthClass = widths[index % widths.length];
                    return(
                        <div className={cn("group flex  w-full items-end justify-end gap-2 py-2",isUser ? "is-user" : "is-assistant flex-row-reverse justify-end")} key={index}>
                                <Skeleton className={cn("h-8 w-full rounded-lg bg-neutral-200",widthClass)} />
                                <Skeleton className="size-8 rounded-full bg-neutral-200" />
                        </div>
                    )
                   })}
                </AIConversationContent>
                <AIConversationScrollButton/>
            </AIConversation>
            <div className="p-2">
                <AIInput>
                    <AIInputTextarea disabled={true} placeholder="Type your response as an operator..." />
                    <AIInputToolbar>
                        <AIInputTools>
                            <AIInputButton disabled={true}><Wand2Icon/></AIInputButton>
                        </AIInputTools>
                        <AIInputSubmit disabled={true} status="ready" type="submit"><SendIcon/></AIInputSubmit>
                    </AIInputToolbar>
                </AIInput>
            </div>
        </div>
    )
}