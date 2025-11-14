"use client";

import {ResizableHandle,ResizablePanel,ResizablePanelGroup} from "@workspace/ui/components/resizable";
import { ConversationsPanel } from "@/modules/dashboard/ui/components/conversations-panel";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export function InboxLayout({children}: {children: React.ReactNode}) {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const isConversationPage = pathname?.includes("/inbox/") && pathname !== "/inbox";

    if (isMobile) {
        if (isConversationPage) {
            return (
                <div className="h-full flex-1">
                    {children}
                </div>
            );
        }
        return (
            <div className="h-full flex-1">
                <ConversationsPanel />
            </div>
        );
    }

    return (
        <ResizablePanelGroup direction="horizontal" className="h-full flex-1 ">
            <ResizablePanel defaultSize={30} maxSize={30} minSize={20}>
                <ConversationsPanel />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70} className="h-full">
                {children}
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}