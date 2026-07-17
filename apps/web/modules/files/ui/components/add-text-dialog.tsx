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
import { Textarea } from "@workspace/ui/components/textarea";
import { useAction } from "convex/react";
import { LoaderIcon, TypeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddTextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTextAdded?: () => void;
}

export function AddTextDialog({
  open,
  onOpenChange,
  onTextAdded,
}: AddTextDialogProps) {
  const addText = useAction(api.private.files.addText);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleCancel = () => {
    onOpenChange(false);
    setTitle("");
    setCategory("");
    setContent("");
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);
    try {
      await addText({
        title: title.trim(),
        content: content.trim(),
        category: category.trim() || undefined,
      });
      toast.success("Text added to knowledge base");
      onTextAdded?.();
      handleCancel();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to add text";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TypeIcon className="size-5" />
            Add Text
          </DialogTitle>
          <DialogDescription>
            Paste or write content directly into your knowledge base — FAQs,
            policies, product notes, anything your AI should know.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="text-title">Title</Label>
              <Input
                id="text-title"
                type="text"
                placeholder="e.g., Refund policy"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text-category">
                Category{" "}
                <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="text-category"
                type="text"
                placeholder="e.g., Documentation, Support"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="text-content">Content</Label>
            <Textarea
              id="text-content"
              placeholder="Write or paste your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSaving}
              className="max-h-72 min-h-40"
            />
            <p className="text-muted-foreground text-xs">
              {content.trim().length > 0
                ? `${content.trim().length.toLocaleString()} characters`
                : "Plain text and markdown are supported"}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isSaving} onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button
            disabled={!title.trim() || !content.trim() || isSaving}
            onClick={handleSave}
          >
            {isSaving ? (
              <>
                <LoaderIcon className="mr-2 size-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add to Knowledge Base"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
