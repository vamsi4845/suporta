"use client";

import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useAction } from "convex/react";
import { GlobeIcon, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  const scrapeWebsite = useAction(api.private.files.scrapeWebsite);

  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [isScraping, setIsScraping] = useState(false);

  const handleScrape = async () => {
    if (!url.trim()) return;

    setIsScraping(true);
    try {
      const result = await scrapeWebsite({
        url: url.trim(),
        category: category.trim() || undefined,
      });
      toast.success(`Successfully scraped: ${result.title}`);
      onScrapeComplete?.();
      handleCancel();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to scrape website";
      toast.error(message);
    } finally {
      setIsScraping(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setUrl("");
    setCategory("");
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
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., Documentation, Support, Product"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isScraping}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
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
            disabled={
              !url.trim() || !isValidUrl(url) || isScraping || !category.trim()
            }
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
