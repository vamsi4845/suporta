import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import { Logo } from "./logo";

export function LogoName({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2 py-1 text-black/80", className)}>
        <Logo />
        <h2 className="text-md font-bold">Suporta</h2>
    </div>
    )
}