"use client";
import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen";
import { screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetScreen } from "@/modules/widget/types";
import { WidgetErrorScreen } from "@/modules/widget/ui/screens/widget-error-screen";
import { WidgetLoadingScreen } from "@/modules/widget/ui/screens/widget-loading-screen";

interface Props {
    organizationId: string | null;
}

export function WidgetView({organizationId}: Props) {
    const screen = useAtomValue(screenAtom);

    const screenComponents = {
        auth: <WidgetAuthScreen />,
        error: <WidgetErrorScreen />,
        loading: <WidgetLoadingScreen organizationId={organizationId} />,
        selection: <p>Selection</p>,
    } as Record<WidgetScreen, React.ReactNode>;
    return <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl">{screenComponents[screen]}</main>;
}
