import { useOrganization } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { CheckIcon, CopyIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CopyInput } from "@/modules/dashboard/ui/components/copy-input";
import { Separator } from "@workspace/ui/components/separator";

export function IntegrationsInstructions() {
    const [copiedSection, setCopiedSection] = useState<boolean>(false);
    const {organization} = useOrganization();
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedSection(true);
            setTimeout(() => setCopiedSection(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const updatedScript = `<script src="https://ai-support-bot-widget-beta.vercel.app" data-organization-id="${organization?.id}"></script>`;
    return (
        <div className="flex min-h-screen flex-col bg-muted p-8">
        <div className="mx-auto w-full max-w-2xl">
            <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl">Integrations</h1>
                <p className="text-muted-foreground">
                    Connect your tools and services to your AI assistant
                </p>
            </div>
            <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                    <Label className="w-34" htmlFor="organization-id">
                        Organization ID
                    </Label>
                    <CopyInput placeholder={organization?.id || ""} />
                </div>
            </div>
            <Separator className="my-8" />
           <IntegrationsInstructions />
        </div>
    </div>
    )
}