import React, { useCallback, useState } from "react";
import { Upload, X, FileText, ArrowUp, ArrowDown } from "lucide-react";
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
  label = "Drop files here or click to browse",
  hint,
}: FileDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const fileArray = Array.from(newFiles);
      setSelectionError(null);

      const tokens = (accept || "")
        .split(",")
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean);

      const invalidType = fileArray.find((file) => {
        if (!tokens.length) return false;
        const extension = `.${file.name.split(".").pop()?.toLowerCase() || ""}`;
        return !tokens.some((token) =>
          token.startsWith(".")
            ? extension === token
            : token.endsWith("/*")
            ? file.type.startsWith(token.slice(0, -1))
            : file.type.toLowerCase() === token
        );
      });

      if (invalidType) {
        setSelectionError(
          `"${invalidType.name}" is not a supported file format for this tool.`
        );
        return;
      }

      const oversized = fileArray.find(
        (file) => file.size > 100 * 1024 * 1024
      );
      if (oversized) {
        setSelectionError(
          `"${oversized.name}" exceeds the 100 MB per-file limit. Please choose a smaller file.`
        );
        return;
      }

      if (multiple) {
        const combined = [...files, ...fileArray];
        if (combined.length > maxFiles) {
          setSelectionError(
            `A maximum of ${maxFiles} files can be selected in a single batch.`
          );
          return;
        }
        const totalBytes = combined.reduce(
          (total, file) => total + file.size,
          0
        );
        if (totalBytes > 250 * 1024 * 1024) {
          setSelectionError(
            "The combined file size exceeds 250 MB. Reduce the batch size to ensure smooth in-browser processing."
          );
          return;
        }
        onFilesChange(combined);
      } else {
        onFilesChange(fileArray.slice(0, 1));
      }
    },
    [files, multiple, maxFiles, onFilesChange, accept]
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
          "relative flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center transition-colors cursor-pointer",
          dragOver
            ? "border-blue-600 bg-blue-50/50"
            : "border-slate-300 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-50"
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
        <Upload className="mb-3 h-8 w-8 text-slate-400" aria-hidden="true" />
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="mt-1 text-xs text-slate-500">
          {hint || "Click to select or drop files here"}
        </p>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          aria-label={label}
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {selectionError && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700"
        >
          {selectionError}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              <strong className="font-medium text-slate-700 tabular-nums">
                {files.length}
              </strong>{" "}
              {files.length === 1 ? "file" : "files"} selected
            </span>
            <button
              type="button"
              onClick={() => onFilesChange([])}
              className="text-slate-500 hover:text-red-600 transition-colors"
            >
              Clear all
            </button>
          </div>

          <ul className="space-y-1.5" aria-label="Selected files">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs"
              >
                <FileText className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-800">{file.name}</p>
                  <p className="text-slate-400 font-mono tabular-nums">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                {multiple && files.length > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                      onClick={() => moveFile(index, "up")}
                      disabled={index === 0}
                      aria-label="Move file up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                      onClick={() => moveFile(index, "down")}
                      disabled={index === files.length - 1}
                      aria-label="Move file down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={() => removeFile(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
