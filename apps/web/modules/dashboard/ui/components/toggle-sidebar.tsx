import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import { useSidebar } from "@workspace/ui/components/sidebar";
import { PanelLeftIcon } from "lucide-react"

export const ToggleSidebar = () => {

    const {toggleSidebar} = useSidebar();
    const handleSidebarOpen = () => {
        toggleSidebar();
    }
    return (
        <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" onClick={handleSidebarOpen}>
                <PanelLeftIcon className="size-4" />
            </Button>
            <Separator orientation="vertical" className="!h-3 !w-[1px] !bg-black/50 mr-2" />
        </div>
    )
}