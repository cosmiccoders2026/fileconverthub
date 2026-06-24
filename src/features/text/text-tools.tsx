"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TextToolWrapper({
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

export function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).filter((s) => s.trim()).length
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length
      : 0;
    const readingTime = Math.ceil(words / 200);

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <TextToolWrapper title="Word Counter">
      <Textarea
        placeholder="Paste or type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px]"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.characters },
          { label: "No Spaces", value: stats.charactersNoSpaces },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Reading Time", value: `${stats.readingTime} min` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-muted/30 p-3 text-center">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </TextToolWrapper>
  );
}

export function CaseConverterTool() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const convert = (type: string) => {
    switch (type) {
      case "upper":
        setOutput(text.toUpperCase());
        break;
      case "lower":
        setOutput(text.toLowerCase());
        break;
      case "title":
        setOutput(
          text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
        );
        break;
      case "sentence":
        setOutput(
          text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (c) => c.toUpperCase())
        );
        break;
      case "alternating":
        setOutput(
          text
            .split("")
            .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
            .join("")
        );
        break;
    }
  };

  return (
    <TextToolWrapper title="Case Converter">
      <Textarea
        placeholder="Enter text to convert..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[120px]"
      />
      <div className="flex flex-wrap gap-2">
        {[
          { label: "UPPERCASE", type: "upper" },
          { label: "lowercase", type: "lower" },
          { label: "Title Case", type: "title" },
          { label: "Sentence case", type: "sentence" },
          { label: "aLtErNaTiNg", type: "alternating" },
        ].map((btn) => (
          <Button key={btn.type} variant="outline" size="sm" onClick={() => convert(btn.type)}>
            {btn.label}
          </Button>
        ))}
      </div>
      {output && (
        <Textarea value={output} readOnly className="min-h-[120px]" />
      )}
    </TextToolWrapper>
  );
}

export function RemoveDuplicateLinesTool() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const result = useMemo(() => {
    if (!text.trim()) return "";
    const lines = text.split("\n");
    const seen = new Set<string>();
    const unique: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    }

    return unique.join("\n");
  }, [text, caseSensitive]);

  const removedCount = text.split("\n").length - result.split("\n").length;

  return (
    <TextToolWrapper title="Remove Duplicate Lines">
      <Textarea
        placeholder="Paste text with duplicate lines..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[150px]"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
        />
        Case-sensitive matching
      </label>
      {text && (
        <>
          <p className="text-sm text-muted-foreground">
            Removed {removedCount} duplicate line(s)
          </p>
          <Textarea value={result} readOnly className="min-h-[150px]" />
        </>
      )}
    </TextToolWrapper>
  );
}

export function TextCleanerTool() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState({
    trimLines: true,
    removeExtraSpaces: true,
    normalizeBreaks: true,
    removeEmptyLines: false,
  });

  const result = useMemo(() => {
    let output = text;
    if (options.normalizeBreaks) {
      output = output.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    }
    if (options.trimLines) {
      output = output
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    }
    if (options.removeExtraSpaces) {
      output = output.replace(/[^\S\n]{2,}/g, " ");
      output = output.replace(/ +/g, " ");
    }
    if (options.removeEmptyLines) {
      output = output
        .split("\n")
        .filter((line) => line.trim())
        .join("\n");
    }
    return output.trim();
  }, [text, options]);

  return (
    <TextToolWrapper title="Text Cleaner">
      <Textarea
        placeholder="Paste messy text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[150px]"
      />
      <div className="space-y-2">
        {[
          { key: "trimLines", label: "Trim whitespace from lines" },
          { key: "removeExtraSpaces", label: "Remove extra spaces" },
          { key: "normalizeBreaks", label: "Normalize line breaks" },
          { key: "removeEmptyLines", label: "Remove empty lines" },
        ].map((opt) => (
          <label key={opt.key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={options[opt.key as keyof typeof options]}
              onChange={(e) =>
                setOptions({ ...options, [opt.key]: e.target.checked })
              }
            />
            {opt.label}
          </label>
        ))}
      </div>
      {text && (
        <Textarea value={result} readOnly className="min-h-[150px]" />
      )}
    </TextToolWrapper>
  );
}
