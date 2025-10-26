import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetScreen } from "@/modules/widget/types";

export function WidgetFooter() {
    const screen = useAtomValue(screenAtom);
    const setScreen = useSetAtom(screenAtom);

    const handleSetScreen = (screen: WidgetScreen) => {
        setScreen(screen);
    }
    return (
        <footer className="flex items-center justify-center h-10">
            <Button className="h-14 flex-1 rounded-none" size="icon" variant="ghost" onClick={() => handleSetScreen("selection")}>
                <HomeIcon className={cn("size-4", screen === "selection" || screen === "auth" && "text-primary")}/>
            </Button>
            <Button className="h-14 flex-1 rounded-none" size="icon" variant="ghost" onClick={() => handleSetScreen("inbox")}>
                <InboxIcon className={cn("size-4", screen === "inbox" && "text-primary")}/>
            </Button>
        </footer>
    )
}