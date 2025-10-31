import { use } from "react";
import { ConversationIdView } from "@/modules/dashboard/ui/views/conversation-id-view";
import { Id } from "@workspace/backend/_generated/dataModel";

export default function Page({params}:{params: Promise<{conversationId: string}>}) {
    const {conversationId} = use(params);
    return (
        <ConversationIdView conversationId={conversationId as Id<"conversations">} />
    )
}