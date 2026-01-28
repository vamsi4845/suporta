"use client";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@workspace/ui/components/table";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import type { PublicFile } from "@workspace/backend/private/files";
import { Button } from "@workspace/ui/components/button";
import {FileIcon,FileTextIcon,ImageIcon,MoreHorizontalIcon,TrashIcon,UploadIcon,GlobeIcon,SearchIcon,CheckCircle2Icon,LoaderIcon,XCircleIcon,FileJsonIcon,FileSpreadsheetIcon,Filter} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { UploadDialog } from "../components/upload-dialog";
import { ScrapeDialog } from "../components/scrape-dialog";
import { useState } from "react";
import { DeleteFileDialog } from "../components/delete-file-dialog";
import { Input } from "@workspace/ui/components/input";
import { ToggleSidebar } from "@/modules/dashboard/ui/components/toggle-sidebar";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";

const getFileIcon = (type: string) => {
  const extension = type.toLowerCase();
  if (extension === "web") return GlobeIcon;
  if (extension === "pdf") return FileTextIcon;
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension))
    return ImageIcon;
  if (["csv", "xlsx", "xls"].includes(extension)) return FileSpreadsheetIcon;
  if (["json", "xml", "yaml", "yml"].includes(extension)) return FileJsonIcon;
  return FileIcon;
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<PublicFile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created");

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

  const formatFileSize = (size: string) => {
    return size;
  };

  const filteredFiles = files.results.filter((file) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      file.name.toLowerCase().includes(query) ||
      file.type.toLowerCase().includes(query) ||
      file.category?.toLowerCase().includes(query)
    );
  });

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
      <DeleteFileDialog
        onOpenChange={setDeleteDialogOpen}
        open={deleteDialogOpen}
        file={selectedFile}
        onDeleted={handleFileDeleted}
      />
      <div className="flex h-full flex-col bg-background">
        <header className="flex items-center gap-2 border-b bg-background px-4 py-2">
          <ToggleSidebar />
          <h1 className="text-lg font-semibold">Data Sources</h1>
        </header>
        <div className="flex flex-1 flex-col overflow-hidden mt-10">
          <div className="bg-background px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-5xl gap-3 items-center">
              <div className="relative flex-1">
                <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 gap-2"
                onClick={() => setUploadDialogOpen(true)}
              >
                <Image src="/folder.svg" alt="Upload" width={20} height={20} />
                Add File
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 gap-2"
                onClick={() => setScrapeDialogOpen(true)}
              >
                <GlobeIcon className="size-4" />
                Scrape URL
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-4 py-4 sm:px-6">
            <div className="mx-auto max-w-5xl">
              {isLoadingFirstPage ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <p className="text-muted-foreground text-sm">
                      Loading files...
                    </p>
                  </div>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center gap-4 p-8">
                  <FileIcon className="text-muted-foreground size-12" />
                  <div className="text-center">
                    <p className="font-medium">No files found</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {searchQuery
                        ? "Try adjusting your search query"
                        : "Upload a file or scrape a website to get started"}
                    </p>
                  </div>
                  {!searchQuery && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setUploadDialogOpen(true)}
                        variant="outline"
                        size="sm"
                      >
                        <UploadIcon className="mr-2 size-4" />
                        Upload File
                      </Button>
                      <Button
                        onClick={() => setScrapeDialogOpen(true)}
                        variant="outline"
                        size="sm"
                      >
                        <GlobeIcon className="mr-2 size-4" />
                        Scrape Website
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Table className="bg-accent !rounded-xl">
                  <TableHeader className="bg-accent !overflow-auto !border-b-0">
                    <TableRow className="!border-b-0">
                      <TableHead className="!rounded-tl-xl">Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Size
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Category
                      </TableHead>
                      <TableHead className="!rounded-tr-xl">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="!bg-white !rounded-xl">
                    {filteredFiles.map((file) => {
                      const FileIconComponent = getFileIcon(file.type);
                      const statusConfig = getStatusConfig(file.status);
                      const StatusIcon = statusConfig.icon;

                      return (
                        <TableRow
                          key={file.id}
                          className="hover:bg-muted/50 !border-b-none"
                        >
                          <TableCell className="!rounded-bl-xl">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                              <div className="flex items-center gap-3">
                                <FileIconComponent className="shrink-0 size-5 text-muted-foreground" />
                                <span className="truncate font-medium">
                                  {file.name}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="!hidden md:!table-cell">
                            <Badge variant="outline" className="uppercase">
                              {file.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {formatFileSize(file.size)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {file.category || "-"}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  className="size-8 p-0"
                                  size="sm"
                                  variant="ghost"
                                  aria-label="More options"
                                >
                                  <MoreHorizontalIcon className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-fit"
                              >
                                <DropdownMenuItem
                                  className="text-destructive flex cursor-pointer items-center gap-2 w-fit"
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
              )}
              {!isLoadingFirstPage && files.results.length > 0 && (
                <div className="mx-auto max-w-5xl border-t">
                  <InfiniteScrollTrigger
                    ref={topElementRef}
                    canLoadMore={canLoadMore}
                    isLoadingMore={isLoadingMore}
                    onLoadMore={handleLoadMore}
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