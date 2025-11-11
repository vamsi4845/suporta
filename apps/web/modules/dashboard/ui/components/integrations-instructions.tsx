"use client"
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
           <div className="space-y-6">
                    <div className="space-y-6 overflow-x-hidden">
                    <div className="space-y-4">
                        <div className="space-y-1">
                    <h2 className="text-2xl">Install the widget</h2>
                    <p className="text-sm text-muted-foreground">
                        Get the Supportly widget running on your website in under a minute.
                    </p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Image src="/code.svg" alt="code" width={20} height={20} />
                                <h3 className="text-base font-semibold">Widget Integration</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Add this single line in head section of your HTML file.
                            </p>
                            <div className="group relative w-full bg-white border border-border rounded-md">
                                <div className="rounded-md p-3 text-sm font-mono overflow-hidden">
                                    <code className="block truncate max-w-[95%]">{updatedScript}</code>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8 hover:!bg-white"
                                    onClick={() => handleCopy(updatedScript)}
                                >
                                    {copiedSection ? (
                                        <CheckIcon className="size-4" />
                                    ) : (
                                        <CopyIcon className="size-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    </div>
    )
}