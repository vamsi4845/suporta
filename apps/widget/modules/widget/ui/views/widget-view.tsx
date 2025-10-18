"use client";
import { useAtomValue } from "jotai";
import { WidgetAuthScreen, WidgetErrorScreen, WidgetLoadingScreen, WidgetSelectionScreen, WidgetChatScreen } from "@/modules/widget/ui/screens";
import { screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetScreen } from "@/modules/widget/types";

interface Props {
    organizationId: string | null;
}

export function WidgetView({organizationId}: Props) {
    const screen = useAtomValue(screenAtom);

    const screenComponents = {
        auth: <WidgetAuthScreen />,
        error: <WidgetErrorScreen />,
        loading: <WidgetLoadingScreen organizationId={organizationId} />,
        selection: <WidgetSelectionScreen />,
        chat: <WidgetChatScreen />,
    } as Record<WidgetScreen, React.ReactNode>;
    return <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl">{screenComponents[screen]}</main>;
}
