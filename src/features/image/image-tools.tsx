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
  const [quality, setQuality] = useState(0.7);
  const [outputFormat, setOutputFormat] = useState<"webp" | "jpeg" | "png">("webp");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");
  const [results, setResults] = useState<
    { name: string; originalSize: number; compressedSize: number; saved: number }[]
  >([]);

  const handleCompress = async () => {
    if (files.length === 0) return;

    setStatus("processing");
    setError(null);
    setResults([]);

    const completed: {
      name: string;
      originalSize: number;
      compressedSize: number;
      saved: number;
    }[] = [];

    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        setProgress(
          `Compressing image ${index + 1} of ${files.length}: ${file.name}`
        );

        const compressedBlob = await compressImage(
          file,
          quality,
          outputFormat
        );

        const extension =
          outputFormat === "jpeg" ? "jpg" : outputFormat;

        const name = file.name.replace(
          /\.[^.]+$/,
          `-compressed.${extension}`
        );

        const saved = file.size - compressedBlob.size;

        completed.push({
          name,
          originalSize: file.size,
          compressedSize: compressedBlob.size,
          saved,
        });

        // Download the actual compressed Blob.
        downloadBlob(compressedBlob, name);

        // Update results with actual output size.
        setResults([...completed]);
      }

      setProgress("");
      setStatus("success");
    } catch (e) {
      setProgress("");
      setError(
        e instanceof Error
          ? e.message
          : "Image compression failed."
      );
      setStatus("error");
    }
  };

  const totalOriginal = results.reduce(
    (sum, item) => sum + item.originalSize,
    0
  );

  const totalCompressed = results.reduce(
    (sum, item) => sum + item.compressedSize,
    0
  );

  const totalSaved = totalOriginal - totalCompressed;

  const savingsPercent =
    totalOriginal > 0
      ? ((totalSaved / totalOriginal) * 100).toFixed(1)
      : "0";

  return (
    <ImageToolWrapper title="Compress Image File Size">
      <FileDropzone
        accept="image/jpeg,image/png,image/webp"
        multiple
        maxFiles={350}
        files={files}
        onFilesChange={(f: File[]) => {
          setFiles(f);
          setStatus("idle");
          setError(null);
          setProgress("");
          setResults([]);
        }}
        label="Select images to compress"
        hint="Supports JPG, JPEG, PNG and WebP. Select up to 350 images."
      />

      <div className="space-y-2 p-3 rounded-md border border-slate-200 bg-slate-50/50">
        <Label className="text-xs font-medium text-slate-700">
          Output Format
        </Label>

        <select
          value={outputFormat}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setOutputFormat(e.target.value as "webp" | "jpeg" | "png")
          }
          className="w-full rounded-md border border-slate-300 bg-white p-2 text-sm"
        >
          <option value="webp">WebP - Recommended</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG - Lossless</option>
        </select>

        <div className="flex justify-between text-xs">
          <Label className="text-slate-700 font-medium">
            Compression Quality
          </Label>
          <span className="font-mono text-slate-600">
            {Math.round(quality * 100)}%
          </span>
        </div>

        <input
          type="range"
          min={0.1}
          max={1}
          step={0.05}
          value={quality}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuality(Number(e.target.value))
          }
          className="w-full accent-blue-600"
          disabled={outputFormat === "png"}
        />

        {outputFormat === "png" && (
          <p className="text-[11px] text-amber-700">
            PNG uses lossless encoding. The quality slider does not apply.
          </p>
        )}

        {outputFormat !== "png" && (
          <p className="text-[11px] text-slate-500">
            Lower quality generally produces smaller files.
          </p>
        )}
      </div>

      {progress && (
        <p
          className="text-xs text-slate-500 font-mono"
          aria-live="polite"
        >
          {progress}
        </p>
      )}

      <ToolStatus status={status} error={error} />

      {results.length > 0 && (
        <div className="space-y-3 rounded-md border border-slate-200 p-3">
          <h3 className="text-sm font-semibold text-slate-900">
            Actual Compression Results
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Original Size</p>
              <p className="text-sm font-semibold">
                {formatFileSize(totalOriginal)}
              </p>
            </div>

            <div className="rounded-md bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Compressed Size</p>
              <p className="text-sm font-semibold">
                {formatFileSize(totalCompressed)}
              </p>
            </div>

            <div className="col-span-2 rounded-md bg-blue-50 p-3">
              <p className="text-xs text-blue-700">
                Actual size change
              </p>
              <p className="text-lg font-bold text-blue-800">
                {totalSaved >= 0 ? "Saved " : "Increased "}
                {formatFileSize(Math.abs(totalSaved))}
                {" "}({Math.abs(Number(savingsPercent))}%)
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {results.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="rounded-md border border-slate-100 p-2"
              >
                <p className="truncate text-xs font-medium">
                  {item.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  {formatFileSize(item.originalSize)}
                  {" → "}
                  {formatFileSize(item.compressedSize)}
                  {" · "}
                  {item.saved >= 0
                    ? `${formatFileSize(item.saved)} saved`
                    : `${formatFileSize(Math.abs(item.saved))} larger`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleCompress}
        disabled={files.length === 0 || status === "processing"}
        className="w-full"
      >
        {status === "processing"
          ? "Compressing Images..."
          : `Compress ${files.length || ""} Images`}
      </Button>
    </ImageToolWrapper>
  );
}


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
