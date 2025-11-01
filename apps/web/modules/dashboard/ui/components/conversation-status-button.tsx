import { Doc } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { Hint } from "@workspace/ui/components/hint";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";


export function ConversationStatusButton({status, onClick,disabled}:{status:Doc<"conversations">["status"]; onClick :()=> void; disabled?: boolean}) {
    if(status === "resolved") {
        return (
            <Hint text="Mark as unresolved" side="top">
                <Button variant="tertiary" size="sm" onClick={onClick}>
                    <CheckIcon className="size-4"/>
                    Resolved
                </Button>
            </Hint>
        )
    }
    if(status === "unresolved") {
        return (
            <Hint text="Mark as escalated" side="top">
                <Button disabled={disabled} variant="destructive" size="sm" onClick={onClick}>
                    <ArrowRightIcon className="size-4"/>
                    Unresolved
                </Button>
            </Hint>
        )
    }
    if(status === "escalated") {
        return (
            <Hint text="Mark as resolved" side="top">
                <Button disabled={disabled} variant="warning" size="sm" onClick={onClick}>
                    <ArrowUpIcon className="size-4"/>   Escalated
                </Button>
            </Hint>
        )
    }
}