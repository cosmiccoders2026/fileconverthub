"use client";

import { useCallback, useState } from "react";
import { Upload, X, FileIcon } from "lucide-react";
import { cn, formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileDropzoneProps {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  files: File[];
  onFilesChange: (files: File[]) => void;
  label?: string;
  hint?: string;
}

export function FileDropzone({
  accept,
  multiple = false,
  maxFiles = 350,
  files,
  onFilesChange,
  label = "Drop files here or click to upload",
  hint,
}: FileDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const fileArray = Array.from(newFiles);
      setSelectionError(null);
      const tokens = (accept || "").split(",").map((part) => part.trim().toLowerCase()).filter(Boolean);
      const invalidType = fileArray.find((file) => {
        if (!tokens.length) return false;
        const extension = `.${file.name.split(".").pop()?.toLowerCase() || ""}`;
        return !tokens.some((token) =>
          token.startsWith(".") ? extension === token :
          token.endsWith("/*") ? file.type.startsWith(token.slice(0, -1)) :
          file.type.toLowerCase() === token
        );
      });
      if (invalidType) {
        setSelectionError(`${invalidType.name} is not a supported file type for this tool.`);
        return;
      }
      const oversized = fileArray.find((file) => file.size > 100 * 1024 * 1024);
      if (oversized) {
        setSelectionError(`${oversized.name} is larger than the 100 MB per-file limit. Choose a smaller file.`);
        return;
      }
      if (multiple) {
        const combined = [...files, ...fileArray];
        if (combined.length > maxFiles) {
          setSelectionError(`You can select up to ${maxFiles} files for this operation. Try a smaller batch if your device has limited memory.`);
          return;
        }
        const totalBytes = combined.reduce((total, file) => total + file.size, 0);
        if (totalBytes > 250 * 1024 * 1024) {
          setSelectionError("The combined selection is larger than 250 MB. Choose a smaller batch to reduce memory pressure.");
          return;
        }
        onFilesChange(combined);
      } else {
        onFilesChange(fileArray.slice(0, 1));
      }
    },
    [files, multiple, maxFiles, onFilesChange]
  );

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    const newFiles = [...files];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFiles.length) return;
    [newFiles[index], newFiles[targetIndex]] = [
      newFiles[targetIndex],
      newFiles[index],
    ];
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
        <p className="mb-1 text-sm font-medium">{label}</p>
        {hint && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          aria-label={label}
          className="absolute inset-0 cursor-pointer opacity-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {selectionError && <p role="alert" className="text-sm text-destructive">{selectionError}</p>}
      {files.length > 0 && (
        <>
        <p className="text-xs text-muted-foreground" aria-live="polite">{files.length} file(s) selected</p>
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3"
            >
              <FileIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              {multiple && files.length > 1 && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => moveFile(index, "up")}
                    disabled={index === 0}
                    aria-label="Move up"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => moveFile(index, "down")}
                    disabled={index === files.length - 1}
                    aria-label="Move down"
                  >
                    ↓
                  </Button>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => removeFile(index)}
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
}
