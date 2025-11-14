"use client"
import { useOrganization } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { CheckIcon, CopyIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CopyInput } from "@/modules/dashboard/ui/components/copy-input";
import { Separator } from "@workspace/ui/components/separator";
import { ToggleSidebar } from "@/modules/dashboard/ui/components/toggle-sidebar";

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

    const updatedScript = `<script src="https://ai-support-bot-widget-beta.vercel.app/widget.js" data-organization-id="${organization?.id}"></script>`;
    return (
        <div className="flex min-h-screen flex-col bg-muted">
             <header className="flex items-center gap-2 border-b bg-background px-4 py-3">
                <ToggleSidebar />
                <h1 className="text-lg font-semibold">Integrations</h1>
            </header>
            <div className=" m-auto w-full max-w-sm md:max-w-xl bg-white rounded-xl p-4 md:p-8 shadow-lg  border border-border">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-4xl">Integrations</h1>
                    <p className="text-muted-foreground">
                        Connect your tools and services to your AI assistant
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                        <Label className="w-34" htmlFor="organization-id">
                            Organization ID
                        </Label>
                        <CopyInput placeholder={organization?.id || ""} />
                    </div>
                </div>
                <Separator className="my-3 md:my-8" />
            <div className="space-y-6">
                        <div className="space-y-6 overflow-x-hidden">
                        <div className="space-y-4">
                            <div className="space-y-1">
                        <h2 className="text-2xl">Install the widget</h2>
                        <p className="text-sm text-muted-foreground">
                            Get the Suporta widget running on your website in under a minute.
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
                            <Separator className="my-3 md:my-8"/>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-base font-semibold mb-3">Works with your favorite technologies</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        The widget works seamlessly with all major web frameworks and technologies.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                                            <Image 
                                                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
                                                alt="HTML5"
                                                width={20}
                                                height={20}
                                                className="size-5"
                                            />
                                            <span className="text-sm font-medium">HTML5</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                                            <Image 
                                                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                                                alt="React"
                                                width={20}
                                                height={20}
                                                className="size-5"
                                            />
                                            <span className="text-sm font-medium">React</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                                            <img 
                                                src="https://cdn.simpleicons.org/javascript?viewbox=auto&size=20"
                                                alt="JavaScript"
                                                className="size-5"
                                            />
                                            <span className="text-sm font-medium">JavaScript</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                                            <img 
                                                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
                                                alt="Next.js"
                                                className="size-5"
                                            />
                                            <span className="text-sm font-medium">Next.js</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                                            <img 
                                                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg"
                                                alt="Vite"
                                                className="size-5"
                                            />
                                            <span className="text-sm font-medium">Vite</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                                            <img 
                                                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg"
                                                alt="Vue.js"
                                                className="size-5"
                                            />
                                            <span className="text-sm font-medium">Vue.js</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                                            <img 
                                                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg"
                                                alt="Svelte"
                                                className="size-5"
                                            />
                                            <span className="text-sm font-medium">Svelte</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    )
}