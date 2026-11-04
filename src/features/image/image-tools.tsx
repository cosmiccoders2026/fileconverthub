import React, { useState } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";
import { ToolStatus } from "@/components/shared/tool-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  convertImageFormat,
  resizeImage,
  compressImage,
  estimateCompressedSize,
} from "@/services/image/image-service";
import { downloadBlob, formatFileSize } from "@/lib/utils";

function ImageToolWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">{children}</CardContent>
    </Card>
  );
}

export function PngToJpgTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.92);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");

  const handleConvert = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setError(null);

    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        setProgress(`Processing file ${index + 1} of ${files.length}: ${file.name}`);
        const blob = await convertImageFormat(file, "jpeg", quality);
        const name = file.name.replace(/\.png$/i, ".jpg");
        downloadBlob(blob, name);
      }
      setProgress("");
      setStatus("success");
    } catch (e) {
      setProgress("");
      setError(e instanceof Error ? e.message : "Conversion failed");
      setStatus("error");
    }
  };

  return (
    <ImageToolWrapper title="PNG to JPG Converter">
      <FileDropzone
        accept=".png,image/png"
        multiple
        maxFiles={350}
        files={files}
        onFilesChange={(f: File[]) => {
          setFiles(f);
          setStatus("idle");
          setError(null);
          setProgress("");
        }}
        label="Select PNG files or drag and drop here"
        hint="Batch selection supported up to 350 files. Converted sequentially to preserve memory."
      />

      <div className="space-y-1.5 p-3 rounded-md border border-slate-200 bg-slate-50/50">
        <div className="flex justify-between text-xs">
          <Label className="text-slate-700 font-medium">JPEG Output Quality</Label>
          <span className="font-mono text-slate-600 tabular-nums">
            {Math.round(quality * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={0.5}
          max={1}
          step={0.05}
          value={quality}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuality(parseFloat(e.target.value))
          }
          className="w-full accent-blue-600"
        />
      </div>

      {progress && (
        <p className="text-xs text-slate-500 font-mono tabular-nums" aria-live="polite">
          {progress}
        </p>
      )}

      <ToolStatus status={status} error={error} />

      <Button
        onClick={handleConvert}
        disabled={files.length === 0 || status === "processing"}
        className="w-full"
      >
        {status === "processing" ? "Converting Images..." : "Convert to JPG"}
      </Button>
    </ImageToolWrapper>
  );
}

export function WebpToJpgTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.92);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");

  const handleConvert = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setError(null);

    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        setProgress(`Processing file ${index + 1} of ${files.length}: ${file.name}`);
        const blob = await convertImageFormat(file, "jpeg", quality);
        const name = file.name.replace(/\.webp$/i, ".jpg");
        downloadBlob(blob, name);
      }
      setProgress("");
      setStatus("success");
    } catch (e) {
      setProgress("");
      setError(e instanceof Error ? e.message : "Conversion failed");
      setStatus("error");
    }
  };

  return (
    <ImageToolWrapper title="WebP to JPG Converter">
      <FileDropzone
        accept=".webp,image/webp"
        multiple
        maxFiles={350}
        files={files}
        onFilesChange={(f: File[]) => {
          setFiles(f);
          setStatus("idle");
          setError(null);
          setProgress("");
        }}
        label="Select WebP files or drag and drop here"
        hint="Converts modern WebP images into standard JPG files."
      />

      <div className="space-y-1.5 p-3 rounded-md border border-slate-200 bg-slate-50/50">
        <div className="flex justify-between text-xs">
          <Label className="text-slate-700 font-medium">JPEG Output Quality</Label>
          <span className="font-mono text-slate-600 tabular-nums">
            {Math.round(quality * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={0.5}
          max={1}
          step={0.05}
          value={quality}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuality(parseFloat(e.target.value))
          }
          className="w-full accent-blue-600"
        />
      </div>

      {progress && (
        <p className="text-xs text-slate-500 font-mono tabular-nums" aria-live="polite">
          {progress}
        </p>
      )}

      <ToolStatus status={status} error={error} />

      <Button
        onClick={handleConvert}
        disabled={files.length === 0 || status === "processing"}
        className="w-full"
      >
        {status === "processing" ? "Converting Images..." : "Convert to JPG"}
      </Button>
    </ImageToolWrapper>
  );
}

export function ResizeImageTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");

  const handleResize = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setError(null);

    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        setProgress(`Resizing file ${index + 1} of ${files.length}...`);
        const blob = await resizeImage(file, width, height, maintainAspect);
        const extension = file.type === "image/png" ? "png" : "jpg";
        const name = file.name.replace(/\.[^.]+$/, `-resized.${extension}`);
        downloadBlob(blob, name);
      }
      setProgress("");
      setStatus("success");
    } catch (e) {
      setProgress("");
      setError(e instanceof Error ? e.message : "Resize failed");
      setStatus("error");
    }
  };

  return (
    <ImageToolWrapper title="Resize Image Dimensions">
      <FileDropzone
        accept="image/*"
        multiple
        maxFiles={350}
        files={files}
        onFilesChange={(f: File[]) => {
          setFiles(f);
          setStatus("idle");
          setError(null);
          setProgress("");
        }}
        label="Select images to resize"
        hint="Supports PNG, JPG, WebP. Specify exact pixel boundaries below."
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs font-medium text-slate-700">Target Width (px)</Label>
          <Input
            type="number"
            value={width}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWidth(parseInt(e.target.value, 10) || 0)
            }
            min={1}
            className="font-mono text-xs tabular-nums"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-slate-700">Target Height (px)</Label>
          <Input
            type="number"
            value={height}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHeight(parseInt(e.target.value, 10) || 0)
            }
            min={1}
            className="font-mono text-xs tabular-nums"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={maintainAspect}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMaintainAspect(e.target.checked)
          }
          className="rounded border-slate-300 text-blue-600 focus:ring-slate-900"
        />
        Maintain original proportional aspect ratio
      </label>

      {progress && (
        <p className="text-xs text-slate-500 font-mono tabular-nums" aria-live="polite">
          {progress}
        </p>
      )}

      <ToolStatus status={status} error={error} />

      <Button
        onClick={handleResize}
        disabled={files.length === 0 || status === "processing"}
        className="w-full"
      >
        {status === "processing" ? "Resizing Images..." : "Resize Images"}
      </Button>
    </ImageToolWrapper>
  );
}

export function CompressImageTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");

  const handleCompress = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setError(null);

    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        setProgress(`Compressing file ${index + 1} of ${files.length}...`);
        const blob = await compressImage(file, quality);
        const extension = file.type === "image/png" ? "png" : "jpg";
        const name = file.name.replace(/\.[^.]+$/, `-compressed.${extension}`);
        downloadBlob(blob, name);
      }
      setProgress("");
      setStatus("success");
    } catch (e) {
      setProgress("");
      setError(e instanceof Error ? e.message : "Compression failed");
      setStatus("error");
    }
  };

  const estimatedSize =
    files.length > 0 ? estimateCompressedSize(files[0].size, quality) : 0;

  return (
    <ImageToolWrapper title="Compress Image File Size">
      <FileDropzone
        accept="image/*"
        multiple
        maxFiles={350}
        files={files}
        onFilesChange={(f: File[]) => {
          setFiles(f);
          setStatus("idle");
          setError(null);
          setProgress("");
        }}
        label="Select images to compress"
        hint="Adjust compression factor to reduce file weight while maintaining legibility."
      />

      <div className="space-y-2 p-3 rounded-md border border-slate-200 bg-slate-50/50">
        <div className="flex justify-between text-xs">
          <Label className="text-slate-700 font-medium">Compression Factor</Label>
          <span className="font-mono text-slate-600 tabular-nums">
            {Math.round(quality * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={0.3}
          max={1}
          step={0.05}
          value={quality}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuality(parseFloat(e.target.value))
          }
          className="w-full accent-blue-600"
        />

        {files.length > 0 && (
          <p className="text-[11px] text-slate-500 font-mono tabular-nums pt-1 border-t border-slate-200/60">
            First file original: {formatFileSize(files[0].size)} → Est. result: ~
            {formatFileSize(estimatedSize)}
          </p>
        )}
      </div>

      {progress && (
        <p className="text-xs text-slate-500 font-mono tabular-nums" aria-live="polite">
          {progress}
        </p>
      )}

      <ToolStatus status={status} error={error} />

      <Button
        onClick={handleCompress}
        disabled={files.length === 0 || status === "processing"}
        className="w-full"
      >
        {status === "processing" ? "Compressing Images..." : "Compress Images"}
      </Button>
    </ImageToolWrapper>
  );
}
