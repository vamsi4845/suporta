"use client";
import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen";
import { screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetScreen } from "@/modules/widget/types";

interface Props {
    organizationId: string;
}

export function WidgetView({organizationId}: Props) {
    const screen = useAtomValue(screenAtom);

    const screenComponents = {
        auth: <WidgetAuthScreen />,
    } as Record<WidgetScreen, React.ReactNode>;
    return <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl">{screenComponents[screen]}</main>;
}
