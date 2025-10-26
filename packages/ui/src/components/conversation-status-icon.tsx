import {ArrowUpIcon,ArrowRightIcon,CheckIcon} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface ConversationStatusIconProps {
    status: "unresolved" | "resolved" | "escalated";
}


const statusConfig = {
    resolved:{
        icon: CheckIcon,
        bgColor: "bg-green-500",
    },
    unresolved:{
        icon: ArrowRightIcon,
        bgColor: "bg-destructive",
    },
    escalated:{
        icon: ArrowUpIcon,
        bgColor: "bg-yellow-500",
    }
} as const;

export function ConversationStatusIcon({ status }: ConversationStatusIconProps) {
    const { icon: Icon, bgColor } = statusConfig[status];
    return (
        <div className={cn("rounded-full flex items-center justify-center p-1.5", bgColor)}>
            <Icon className="size-3 stroke-3 text-white" />
        </div>
    )
}