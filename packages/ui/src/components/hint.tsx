"use client";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@workspace/ui/components/tooltip";


interface HintProps {
    children: React.ReactNode;
    text: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    className?: string;
}


export function Hint({ children, text, side = "top", align = "center", className }: HintProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent side={side} align={align} className={className}>
                {text}
            </TooltipContent>
        </Tooltip>
    );
}