"use client";

import { WidgetFooter } from "@/modules/widget/ui/components/widget-footer";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";

interface Props {
    organizationId: string;
}

export function WidgetView({organizationId}: Props) {
    return (
        <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl">
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
            <div className="flex-1">
                widget content
            </div>
            <WidgetFooter />
        </main>
    )
}
