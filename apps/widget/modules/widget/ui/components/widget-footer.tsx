import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";

export function WidgetFooter() {
    const screen = "selection"
    return (
        <footer className="flex items-center justify-center h-10">
            <Button className="h-14 flex-1 rounded-none" size="icon" variant="ghost">
                <HomeIcon className={cn("size-4", screen === "selection" && "text-primary")}/>
            </Button>
            <Button className="h-14 flex-1 rounded-none" size="icon" variant="ghost">
                <InboxIcon className={cn("size-4", screen === "inbox" && "text-primary")}/>
            </Button>
        </footer>
    )
}