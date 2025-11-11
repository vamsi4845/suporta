"use client";
import { cn } from "@workspace/ui/lib/utils";
import { useWidgetCustomization } from "@/modules/widget/hooks/use-widget-customization";

export function WidgetHeader({children, className}: {children: React.ReactNode, className?: string}) {
    const customization = useWidgetCustomization();
    return (
        <header className={cn("p-4 text-primary-foreground", className)} style={{ backgroundColor: customization?.primaryColor}}>
            {children}
        </header>
    )
}