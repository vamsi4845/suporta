"use client";

import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { GlobeIcon, LoaderIcon } from "lucide-react";
import { useState } from "react";

interface ScrapeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onScrapeComplete?: () => void;
}

export const ScrapeDialog = ({
    open,
    onOpenChange,
    onScrapeComplete,
}: ScrapeDialogProps) => {
    const [url, setUrl] = useState("");
    const [isScraping, setIsScraping] = useState(false);

    const handleScrape = async () => {
        if (!url.trim()) return;
        
        setIsScraping(true);
        try {
            // TODO: Implement scraping logic
            await new Promise(resolve => setTimeout(resolve, 2000));
            onScrapeComplete?.();
            handleCancel();
        } catch (error) {
            console.error(error);
        } finally {
            setIsScraping(false);
        }
    };

    const handleCancel = () => {
        onOpenChange(false);
        setUrl("");
    };

    const isValidUrl = (urlString: string) => {
        try {
            const urlObj = new URL(urlString);
            return urlObj.protocol === "http:" || urlObj.protocol === "https:";
        } catch {
            return false;
        }
    };

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <GlobeIcon className="size-5" />
                        Scrape Website
                    </DialogTitle>
                    <DialogDescription>
                        Enter a URL to scrape content and add it to your knowledge base
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="url">
                            Website URL
                        </Label>
                        <Input
                            id="url"
                            type="url"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={isScraping}
                            className="font-mono text-sm"
                        />
                        {url && !isValidUrl(url) && (
                            <p className="text-destructive text-sm">
                                Please enter a valid URL starting with http:// or https://
                            </p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        disabled={isScraping}
                        onClick={handleCancel}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!url.trim() || !isValidUrl(url) || isScraping}
                        onClick={handleScrape}
                    >
                        {isScraping ? (
                            <>
                                <LoaderIcon className="mr-2 size-4 animate-spin" />
                                Scraping...
                            </>
                        ) : (
                            "Scrape"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
