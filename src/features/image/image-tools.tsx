"use client";

import { useState } from "react";
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
import { Download } from "lucide-react";

function ImageToolWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export function PngToJpgTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.92);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setError(null);
    try {
      const blob = await convertImageFormat(files[0], "jpeg", quality);
      const name = files[0].name.replace(/\.png$/i, ".jpg");
      downloadBlob(blob, name);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setStatus("error");
    }
  };

  return (
    <ImageToolWrapper title="PNG to JPG">
      <FileDropzone
        accept=".png,image/png"
        files={files}
        onFilesChange={(f) => { setFiles(f); setStatus("idle"); }}
        label="Drop PNG file here"
      />
      <div className="space-y-2">
        <Label>Quality: {Math.round(quality * 100)}%</Label>
        <input
          type="range"
          min={0.5}
          max={1}
          step={0.05}
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <ToolStatus status={status} error={error} />
      <Button onClick={handleConvert} disabled={files.length === 0 || status === "processing"} className="w-full">
        Convert to JPG
      </Button>
    </ImageToolWrapper>
  );
}

export function WebpToJpgTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.92);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setError(null);
    try {
      const blob = await convertImageFormat(files[0], "jpeg", quality);
      const name = files[0].name.replace(/\.webp$/i, ".jpg");
      downloadBlob(blob, name);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setStatus("error");
    }
  };

  return (
    <ImageToolWrapper title="WebP to JPG">
      <FileDropzone
        accept=".webp,image/webp"
        files={files}
        onFilesChange={(f) => { setFiles(f); setStatus("idle"); }}
        label="Drop WebP file here"
      />
      <div className="space-y-2">
        <Label>Quality: {Math.round(quality * 100)}%</Label>
        <input
          type="range"
          min={0.5}
          max={1}
          step={0.05}
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <ToolStatus status={status} error={error} />
      <Button onClick={handleConvert} disabled={files.length === 0 || status === "processing"} className="w-full">
        Convert to JPG
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

  const handleResize = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setError(null);
    try {
      const blob = await resizeImage(files[0], width, height, maintainAspect);
      const ext = files[0].name.split(".").pop() || "jpg";
      const name = files[0].name.replace(/\.[^.]+$/, `-resized.${ext}`);
      downloadBlob(blob, name);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Resize failed");
      setStatus("error");
    }
  };

  return (
    <ImageToolWrapper title="Resize Image">
      <FileDropzone
        accept="image/*"
        files={files}
        onFilesChange={(f) => { setFiles(f); setStatus("idle"); }}
        label="Drop image here"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Width (px)</Label>
          <Input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)} min={1} />
        </div>
        <div className="space-y-2">
          <Label>Height (px)</Label>
          <Input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)} min={1} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} />
        Maintain aspect ratio
      </label>
      <ToolStatus status={status} error={error} />
      <Button onClick={handleResize} disabled={files.length === 0 || status === "processing"} className="w-full">
        Resize Image
      </Button>
    </ImageToolWrapper>
  );
}

export function CompressImageTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleCompress = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setError(null);
    try {
      const blob = await compressImage(files[0], quality);
      const ext = files[0].name.split(".").pop() || "jpg";
      const name = files[0].name.replace(/\.[^.]+$/, `-compressed.${ext}`);
      downloadBlob(blob, name);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Compression failed");
      setStatus("error");
    }
  };

  const estimatedSize = files.length > 0
    ? estimateCompressedSize(files[0].size, quality)
    : 0;

  return (
    <ImageToolWrapper title="Compress Image">
      <FileDropzone
        accept="image/*"
        files={files}
        onFilesChange={(f) => { setFiles(f); setStatus("idle"); }}
        label="Drop image here"
      />
      <div className="space-y-2">
        <Label>Quality: {Math.round(quality * 100)}%</Label>
        <input
          type="range"
          min={0.3}
          max={1}
          step={0.05}
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
          className="w-full"
        />
        {files.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Original: {formatFileSize(files[0].size)} → Estimated: {formatFileSize(estimatedSize)}
          </p>
        )}
      </div>
      <ToolStatus status={status} error={error} />
      <Button onClick={handleCompress} disabled={files.length === 0 || status === "processing"} className="w-full">
        Compress Image
      </Button>
    </ImageToolWrapper>
  );
}
