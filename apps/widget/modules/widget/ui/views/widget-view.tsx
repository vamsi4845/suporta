"use client";
import { useAtomValue, useSetAtom } from "jotai";
import { WidgetAuthScreen, WidgetErrorScreen, WidgetLoadingScreen, WidgetSelectionScreen, WidgetChatScreen, WidgetInboxScreen } from "@/modules/widget/ui/screens";
import { screenAtom, customizationAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetScreen } from "@/modules/widget/types";
import { useWidgetCustomization } from "@/modules/widget/hooks/use-widget-customization";
import { useEffect } from "react";

interface Props {
    organizationId: string | null;
    previewCustomization?: {
        buttonColor?: string;
        primaryColor?: string;
        backgroundColor?: string;
        position?: "bottom-right" | "bottom-left";
        logoUrl?: string;
    };
}

export function WidgetView({organizationId, previewCustomization}: Props) {
    const screen = useAtomValue(screenAtom);
    const setCustomization = useSetAtom(customizationAtom);
    const customization = useWidgetCustomization();

    useEffect(() => {
        if (previewCustomization) {
            const mergedCustomization = {
                buttonColor: previewCustomization.buttonColor || customization?.buttonColor || "#3b82f6",
                primaryColor: previewCustomization.primaryColor || customization?.primaryColor || "#3b82f6",
                backgroundColor: previewCustomization.backgroundColor || customization?.backgroundColor || "#ffffff",
                position: previewCustomization.position || customization?.position || "bottom-right",
                logoUrl: previewCustomization.logoUrl !== undefined ? previewCustomization.logoUrl : (customization?.logoUrl || null),
            };
            setCustomization(mergedCustomization);
        }
    }, [previewCustomization, customization, setCustomization]);

    const currentCustomization = customization || {
        buttonColor: "#3b82f6",
        primaryColor: "#3b82f6",
        backgroundColor: "#ffffff",
        position: "bottom-right" as const,
        logoUrl: null,
    };

    const screenComponents = {
        auth: <WidgetAuthScreen />,
        error: <WidgetErrorScreen />,
        loading: <WidgetLoadingScreen organizationId={organizationId} />,
        selection: <WidgetSelectionScreen />,
        chat: <WidgetChatScreen />,
        inbox: <WidgetInboxScreen />,
    } as Record<WidgetScreen, React.ReactNode>;
    
    return (
        <main 
            className="flex h-full w-full flex-col overflow-hidden rounded-xl border"
            style={{ backgroundColor: currentCustomization.backgroundColor }}
        >
            {screenComponents[screen]}
        </main>
    );
}
