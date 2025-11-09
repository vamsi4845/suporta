"use client"
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useOrganization } from "@clerk/nextjs";
import { Separator } from "@workspace/ui/components/separator";
import { INTEGRATIONS } from "../../constants";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { CopyIcon } from "lucide-react";
import { useState } from "react";

export function IntegrationsView() {
    const {organization} = useOrganization();
    const [dialogOpen,setDialogOpen] = useState(false);
    const [script,setScript] = useState("");

    const handleOpenChange = (script:string)=>{
        if(!organization?.id) return;
        setScript(script.replace("{{ORGANIZATION_ID}}",organization.id));
        setDialogOpen(true);
    }
    return (
        <>
        <IntegrationsDialog open={dialogOpen} onOpenChange={setDialogOpen} script={script} />
        <div className="flex min-h-screen flex-col bg-muted p-8">
            <div className="mx-auto w-full max-w-screen-md">
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
                        <Input disabled readOnly className="flex-1 bg-background font-mono text-sm" id="organization-id" value={organization?.id} />
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="space-y-6">
                    <div className="space-y-1">
                        <Label className="text-lg">Integrations</Label>
                        <p className="text-muted-foreground"> Add the following integrations to your website to setup chat box widget</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {INTEGRATIONS.map((integration) => (
                            <div key={integration.id} className="flex flex-col items-center justify-center p-4 border rounded-lg" onClick={()=>handleOpenChange(integration.script)}>
                                <Image src={integration.icon as string} alt={integration.title} width={40} height={40} />
                                <p className="text-sm">{integration.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export function IntegrationsDialog({open, onOpenChange, script}:{open:boolean, onOpenChange:(open:boolean)=> void, script:string}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Integration</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="rounded-md text-sm">
                        1.Copy the following code
                       </div>
                       <div className="group relative">
                        <pre className="max-h-[300px] overflow-y-auto rounded-md bg-background p-4 text-sm">
                            <code className="language-html">{script}</code>
                        </pre>
                        <Button variant="ghost" className="absolute top-2 right-2">
                            <CopyIcon className="size-4" />
                        </Button>
                       </div>
                       <div className="rounded-md text-sm">
                        2.Paste it in the head section of your HTML file
                       </div>
                       <div className="rounded-md text-sm">
                        3.Refresh your page to see the changes
                       </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}