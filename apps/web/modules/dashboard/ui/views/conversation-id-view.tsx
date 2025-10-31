"use client";

import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { AIConversation, AIConversationContent, AIConversationScrollButton } from "@workspace/ui/components/ai/conversation";
import { AIInput, AIInputButton, AIInputSubmit, AIInputTextarea, AIInputToolbar, AIInputTools } from "@workspace/ui/components/ai/input";
import { AIMessage, AIMessageContent } from "@workspace/ui/components/ai/message";
import { AIResponse } from "@workspace/ui/components/ai/response";
import { Button } from "@workspace/ui/components/button";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { Form, FormField } from "@workspace/ui/components/form";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontalIcon, Wand2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    message:z.string().min(1,"Message is required")
})



export function ConversationIdView({conversationId}: {conversationId: Id<"conversations">}) {
    const router = useRouter();
    const conversation = useQuery(api.private.conversations.getOne, {conversationId});
    const messages = useThreadMessages(api.private.messages.getMany, conversation?.threadId ? {threadId: conversation.threadId}:"skip", {initialNumItems: 10});
    const {topElementRef, handleLoadMore, canLoadMore, isLoadingMore} = useInfiniteScroll({status: messages.status, loadMore: messages.loadMore,loadSize: 10});
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
    return (
        <div className="flex h-full flex-col bg-muted">
            <header className="flex items-center justify-between border-b bg-background p-2.5">
                <Button size="sm" variant="ghost" onClick={() => {
                    router.push(`/conversations/${conversationId}`);
                }}>
                    <MoreHorizontalIcon/>
                </Button>
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
                            <AIInputTextarea {...field} disabled={conversation?.status === "resolved" || form.formState.isSubmitting} onChange={field.onChange} onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                if(e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    form.handleSubmit(onSubmit)();
                                }
                            }} placeholder={conversation?.status === "resolved" ? "This Conversation has been resolved" : "Type your response as an operator..."} />
                        )} />
                        <AIInputToolbar>
                            <AIInputTools>
                            <AIInputButton>
                                <Wand2Icon/>
                                Enhance
                            </AIInputButton>
                            </AIInputTools>
                            <AIInputSubmit disabled={!form.formState.isValid || conversation?.status === "resolved"} status="ready" type="submit"/>
                        </AIInputToolbar>
                    </AIInput>
                </Form>
            </div>
        </div>
    )
}