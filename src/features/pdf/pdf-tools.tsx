"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";
import { ToolStatus } from "@/components/shared/tool-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mergePdfFiles } from "@/services/pdf/pdf-service";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

export function MergePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please upload at least 2 PDF files to merge.");
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
      downloadBlob(blob, "merged.pdf");
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to merge PDFs");
      setStatus("error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Merge PDF Files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileDropzone
          accept=".pdf,application/pdf"
          multiple
          maxFiles={20}
          files={files}
          onFilesChange={(f) => {
            setFiles(f);
            setStatus("idle");
            setError(null);
          }}
          label="Drop PDF files here or click to upload"
          hint="Upload 2 or more PDF files. Reorder before merging."
        />
        <ToolStatus status={status} error={error} />
        <Button
          onClick={handleMerge}
          disabled={files.length < 2 || status === "processing"}
          className="w-full"
        >
          {status === "processing" ? "Merging..." : "Merge PDF"}
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
      const { compressPdf } = await import("@/services/pdf/pdf-service");
      const result = await compressPdf(files[0], level);
      const blob = new Blob([result.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      const name = files[0].name.replace(/\.pdf$/i, "") + "-compressed.pdf";
      downloadBlob(blob, name);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to compress PDF");
      setStatus("error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compress PDF</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileDropzone
          accept=".pdf,application/pdf"
          files={files}
          onFilesChange={(f) => {
            setFiles(f);
            setStatus("idle");
          }}
          label="Drop a PDF file here"
        />
        <div className="flex gap-2">
          {(["light", "balanced", "maximum"] as const).map((l) => (
            <Button
              key={l}
              variant={level === l ? "default" : "outline"}
              size="sm"
              onClick={() => setLevel(l)}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </Button>
          ))}
        </div>
        <ToolStatus status={status} error={error} />
        <Button
          onClick={handleCompress}
          disabled={files.length === 0 || status === "processing"}
          className="w-full"
        >
          Compress PDF
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
    if (files.length === 0) return;

    setStatus("processing");
    setError(null);

    try {
      const { imagesToPdf } = await import("@/services/pdf/pdf-service");
      const result = await imagesToPdf(files);
      const blob = new Blob([result.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      downloadBlob(blob, "images.pdf");
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to convert images");
      setStatus("error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>JPG to PDF</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileDropzone
          accept=".jpg,.jpeg,image/jpeg"
          multiple
          files={files}
          onFilesChange={(f) => {
            setFiles(f);
            setStatus("idle");
          }}
          label="Drop JPG/JPEG images here"
          hint="Multiple images will be combined into one PDF"
        />
        <ToolStatus status={status} error={error} />
        <Button
          onClick={handleConvert}
          disabled={files.length === 0 || status === "processing"}
          className="w-full"
        >
          Convert to PDF
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
    if (files.length === 0) return;

    setStatus("processing");
    setError(null);
    setResults([]);

    try {
      const { pdfToJpgImages } = await import("@/services/pdf/pdf-service");
      const images = await pdfToJpgImages(files[0]);
      setResults(images);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to convert PDF");
      setStatus("error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>PDF to JPG</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileDropzone
          accept=".pdf,application/pdf"
          files={files}
          onFilesChange={(f) => {
            setFiles(f);
            setStatus("idle");
            setResults([]);
          }}
          label="Drop a PDF file here"
        />

        <ToolStatus status={status} error={error} />

        <Button
          onClick={handleConvert}
          disabled={files.length === 0 || status === "processing"}
          className="w-full"
        >
          Convert to JPG
        </Button>

        {results.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {results.length} page(s) converted
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {results.map((r) => (
                <Button
                  key={r.name}
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => downloadBlob(r.blob, r.name)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {r.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}