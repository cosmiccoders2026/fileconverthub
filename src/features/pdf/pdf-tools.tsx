import React, { useState } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";
import { ToolStatus } from "@/components/shared/tool-status";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  mergePdfFiles,
  compressPdf,
  imagesToPdf,
  pdfToJpgImages,
} from "@/services/pdf/pdf-service";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

export function MergePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge.");
      setStatus("error");
      return;
    }

    if (files.length > 350) {
      setError("You can merge a maximum of 350 PDF files per batch.");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setError(null);

    try {
      const result = await mergePdfFiles(files);
      const blob = new Blob([result.buffer as ArrayBuffer], {
        type: "application/pdf",
      });

      downloadBlob(blob, "merged-document.pdf");
      setStatus("success");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to merge PDF files. Ensure files are valid and not password-protected."
      );
      setStatus("error");
    }
  };

  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">
          Merge PDF Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <FileDropzone
          accept=".pdf,application/pdf"
          multiple
          maxFiles={350}
          files={files}
          onFilesChange={(f: File[]) => {
            setFiles(f);
            setStatus("idle");
            setError(null);
          }}
          label="Select PDF files or drag and drop here"
          hint="Select 2 to 350 files. Use the arrow controls in the list to adjust final page sequence."
        />

        <ToolStatus status={status} error={error} />

        <Button
          onClick={handleMerge}
          disabled={files.length < 2 || status === "processing"}
          className="w-full"
        >
          {status === "processing" ? "Merging Documents..." : `Merge ${files.length > 0 ? files.length : ""} PDF Files`}
        </Button>
      </CardContent>
    </Card>
  );
}

export function CompressPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [level, setLevel] = useState<"light" | "balanced" | "maximum">("balanced");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleCompress = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setError(null);

    try {
      const result = await compressPdf(files[0], level);
      const blob = new Blob([result.buffer as ArrayBuffer], {
        type: "application/pdf",
      });

      const name = files[0].name.replace(/\.pdf$/i, "") + "-compressed.pdf";
      downloadBlob(blob, name);
      setStatus("success");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to compress PDF. Please verify file integrity."
      );
      setStatus("error");
    }
  };

  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">
          Compress PDF Document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <FileDropzone
          accept=".pdf,application/pdf"
          files={files}
          onFilesChange={(f: File[]) => {
            setFiles(f);
            setStatus("idle");
            setError(null);
          }}
          label="Select a PDF file to compress"
          hint="Optimizes internal object streams and structural dictionary encoding."
        />

        <div className="space-y-1.5 p-3 rounded-md border border-slate-200 bg-slate-50/50">
          <p className="text-xs font-medium text-slate-700">Optimization Preset</p>
          <div className="flex gap-2">
            {(["light", "balanced", "maximum"] as const).map((l) => (
              <Button
                key={l}
                variant={level === l ? "default" : "outline"}
                size="sm"
                onClick={() => setLevel(l)}
                className="text-xs flex-1 capitalize"
              >
                {l}
              </Button>
            ))}
          </div>
        </div>

        <ToolStatus status={status} error={error} />

        <Button
          onClick={handleCompress}
          disabled={files.length === 0 || status === "processing"}
          className="w-full"
        >
          {status === "processing" ? "Compressing Document..." : "Compress PDF"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function JpgToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) {
      setError("Please select at least one JPG/JPEG image.");
      setStatus("error");
      return;
    }

    if (files.length > 350) {
      setError("You can combine a maximum of 350 images per batch.");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setError(null);

    try {
      const result = await imagesToPdf(files);
      const blob = new Blob([result.buffer as ArrayBuffer], {
        type: "application/pdf",
      });

      downloadBlob(blob, "converted-images.pdf");
      setStatus("success");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to convert images to PDF"
      );
      setStatus("error");
    }
  };

  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">
          JPG to PDF Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <FileDropzone
          accept=".jpg,.jpeg,image/jpeg"
          multiple
          maxFiles={350}
          files={files}
          onFilesChange={(f: File[]) => {
            setFiles(f);
            setStatus("idle");
            setError(null);
          }}
          label="Select JPG/JPEG photos or drag and drop here"
          hint="Select up to 350 photos. Photos will be packaged into a single sequential PDF document."
        />

        <ToolStatus status={status} error={error} />

        <Button
          onClick={handleConvert}
          disabled={files.length === 0 || status === "processing"}
          className="w-full"
        >
          {status === "processing" ? "Generating PDF..." : "Convert to PDF"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function PdfToJpgTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ name: string; blob: Blob }[]>([]);

  const handleConvert = async () => {
    if (files.length === 0) {
      setError("Please select a PDF file.");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setError(null);
    setResults([]);

    try {
      const images = await pdfToJpgImages(files[0]);
      setResults(images);
      setStatus("success");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to rasterize PDF pages"
      );
      setStatus("error");
    }
  };

  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">
          PDF to JPG Page Extractor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <FileDropzone
          accept=".pdf,application/pdf"
          files={files}
          onFilesChange={(f: File[]) => {
            setFiles(f);
            setStatus("idle");
            setError(null);
            setResults([]);
          }}
          label="Select a PDF document to rasterize"
          hint="Each page will be rendered as a high-resolution JPEG image in your browser."
        />

        <ToolStatus status={status} error={error} />

        <Button
          onClick={handleConvert}
          disabled={files.length === 0 || status === "processing"}
          className="w-full"
        >
          {status === "processing" ? "Rasterizing Pages..." : "Convert Pages to JPG"}
        </Button>

        {results.length > 0 && (
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-800">
              {results.length} page(s) converted successfully
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {results.map((r) => (
                <Button
                  key={r.name}
                  variant="outline"
                  size="sm"
                  className="justify-between text-xs h-9 px-3"
                  onClick={() => downloadBlob(r.blob, r.name)}
                >
                  <span className="truncate">{r.name}</span>
                  <Download className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
