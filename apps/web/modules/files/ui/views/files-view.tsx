"use client";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@workspace/ui/components/table";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import type { PublicFile } from "@workspace/backend/private/files";
import { Button } from "@workspace/ui/components/button";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  MoreHorizontalIcon,
  TrashIcon,
  GlobeIcon,
  SearchIcon,
  CheckCircle2Icon,
  LoaderIcon,
  XCircleIcon,
  FileJsonIcon,
  FileSpreadsheetIcon,
  PlusIcon,
  TypeIcon,
  LibraryBigIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { UploadDialog } from "../components/upload-dialog";
import { ScrapeDialog } from "../components/scrape-dialog";
import { AddTextDialog } from "../components/add-text-dialog";
import { useState } from "react";
import { DeleteFileDialog } from "../components/delete-file-dialog";
import { Input } from "@workspace/ui/components/input";
import Image from "next/image";
import { ToggleSidebar } from "@/modules/dashboard/ui/components/toggle-sidebar";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty";
import { cn } from "@workspace/ui/lib/utils";

const getFileIcon = (type: string) => {
  const extension = type.toLowerCase();
  if (extension === "web") return GlobeIcon;
  if (extension === "txt" || extension === "md") return TypeIcon;
  if (extension === "pdf") return FileTextIcon;
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension))
    return ImageIcon;
  if (["csv", "xlsx", "xls"].includes(extension)) return FileSpreadsheetIcon;
  if (["json", "xml", "yaml", "yml"].includes(extension)) return FileJsonIcon;
  return FileIcon;
};

const getSourceLabel = (type: string) => {
  const extension = type.toLowerCase();
  if (extension === "web") return "Website";
  if (extension === "txt" || extension === "md") return "Text";
  return extension.toUpperCase();
};

const getStatusConfig = (status: PublicFile["status"]) => {
  switch (status) {
    case "ready":
      return {
        label: "Ready",
        icon: CheckCircle2Icon,
        className:
          "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
      };
    case "processing":
      return {
        label: "Processing",
        icon: LoaderIcon,
        className:
          "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
      };
    case "error":
      return {
        label: "Error",
        icon: XCircleIcon,
        className:
          "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
      };
    default: {
      const _exhaustive: never = status;
      throw new Error(`Unhandled status: ${_exhaustive}`);
    }
  }
};

export const FilesView = () => {
  const files = usePaginatedQuery(
    api.private.files.list,
    {},
    { initialNumItems: 10 }
  );
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [scrapeDialogOpen, setScrapeDialogOpen] = useState(false);
  const [textDialogOpen, setTextDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<PublicFile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteClick = (file: PublicFile) => {
    setSelectedFile(file);
    setDeleteDialogOpen(true);
  };

  const handleFileDeleted = () => {
    setSelectedFile(null);
  };

  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: files.status,
    loadMore: files.loadMore,
    loadSize: 10,
  });

  const filteredFiles = files.results.filter((file) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      file.name.toLowerCase().includes(query) ||
      file.type.toLowerCase().includes(query) ||
      file.category?.toLowerCase().includes(query)
    );
  });

  const addSourceMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="h-9 gap-1.5 px-4">
          <PlusIcon className="size-4" />
          Add source
          <ChevronDownIcon className="size-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => setTextDialogOpen(true)}>
          <TypeIcon className="size-4" />
          <div className="flex flex-col">
            <span>Write or paste text</span>
            <span className="text-muted-foreground text-xs">
              FAQs, policies, notes
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUploadDialogOpen(true)}>
          <Image src="/folder.svg" alt="Upload" width={16} height={16} />
          <div className="flex flex-col">
            <span>Upload a file</span>
            <span className="text-muted-foreground text-xs">
              PDF, CSV, TXT up to 5MB
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setScrapeDialogOpen(true)}>
          <GlobeIcon className="size-4" />
          <div className="flex flex-col">
            <span>Import from website</span>
            <span className="text-muted-foreground text-xs">
              Scrape a page by URL
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <UploadDialog
        onOpenChange={setUploadDialogOpen}
        open={uploadDialogOpen}
      />
      <ScrapeDialog
        onOpenChange={setScrapeDialogOpen}
        open={scrapeDialogOpen}
      />
      <AddTextDialog
        onOpenChange={setTextDialogOpen}
        open={textDialogOpen}
      />
      <DeleteFileDialog
        onOpenChange={setDeleteDialogOpen}
        open={deleteDialogOpen}
        file={selectedFile}
        onDeleted={handleFileDeleted}
      />
      <div className="flex h-full flex-col bg-muted/40">
        <header className="flex items-center gap-2 border-b bg-background px-4 py-2">
          <ToggleSidebar />
          <h1 className="text-lg font-semibold">Knowledge Base</h1>
        </header>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Knowledge Base
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Everything your AI assistant knows. Add text, files, or
                    websites to improve its answers.
                  </p>
                </div>
                {addSourceMenu}
              </div>

              <div className="relative">
                <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Search sources by name, type, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background h-9 pl-9"
                />
              </div>

              {isLoadingFirstPage ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <p className="text-muted-foreground text-sm">
                      Loading sources...
                    </p>
                  </div>
                </div>
              ) : filteredFiles.length === 0 ? (
                <Empty className="bg-background rounded-xl border border-dashed">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <LibraryBigIcon />
                    </EmptyMedia>
                    <EmptyTitle>
                      {searchQuery
                        ? "No sources match your search"
                        : "Teach your AI assistant"}
                    </EmptyTitle>
                    <EmptyDescription>
                      {searchQuery
                        ? "Try a different name, type, or category."
                        : "Add your docs, FAQs, and website content so the assistant can answer customer questions accurately."}
                    </EmptyDescription>
                  </EmptyHeader>
                  {!searchQuery && <EmptyContent>{addSourceMenu}</EmptyContent>}
                </Empty>
              ) : (
                <div className="bg-background overflow-hidden rounded-xl border shadow-xs">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="pl-4">Name</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Source
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Size
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Category
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-12" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFiles.map((file) => {
                        const FileIconComponent = getFileIcon(file.type);
                        const statusConfig = getStatusConfig(file.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                          <TableRow
                            key={file.id}
                            className="hover:bg-muted/40 group transition-colors"
                          >
                            <TableCell className="max-w-64 pl-4">
                              <div className="flex items-center gap-3">
                                <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-md border">
                                  <FileIconComponent className="size-4" />
                                </div>
                                <span className="truncate text-sm font-medium">
                                  {file.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge
                                variant="outline"
                                className="text-muted-foreground font-normal"
                              >
                                {getSourceLabel(file.type)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground hidden text-sm md:table-cell">
                              {file.size}
                            </TableCell>
                            <TableCell className="text-muted-foreground hidden text-sm lg:table-cell">
                              {file.category || "—"}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "gap-1 font-normal",
                                  statusConfig.className
                                )}
                              >
                                <StatusIcon
                                  className={cn(
                                    "size-3",
                                    file.status === "processing" &&
                                      "animate-spin"
                                  )}
                                />
                                {statusConfig.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    className="size-8 p-0 opacity-60 transition-opacity group-hover:opacity-100"
                                    size="sm"
                                    variant="ghost"
                                    aria-label="More options"
                                  >
                                    <MoreHorizontalIcon className="size-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    variant="destructive"
                                    onClick={() => handleDeleteClick(file)}
                                  >
                                    <TrashIcon className="size-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <InfiniteScrollTrigger
                    ref={topElementRef}
                    canLoadMore={canLoadMore}
                    isLoadingMore={isLoadingMore}
                    onLoadMore={handleLoadMore}
                    className={cn(
                      "border-t",
                      !canLoadMore && !isLoadingMore && "hidden"
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
