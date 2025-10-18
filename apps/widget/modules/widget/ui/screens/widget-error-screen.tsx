"use client";

import { useAtomValue } from "jotai";
import { AlertTriangle } from "lucide-react";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { errorMessageAtom } from "@/modules/widget/atoms/widget-atoms";

export function WidgetErrorScreen() {
    const errorMessage = useAtomValue(errorMessageAtom);

    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-2 px-2 py-6 font-semibold">
                    <p className="text-3xl ">
                    Hi, there!
                    </p>
                    <p className="text-lg">
                        How can we help you today?
                    </p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <p className="text-destructive text-sm font-normal">{errorMessage || "An error occurred"}</p>
            </div>
        </>
    )
}