import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, RotateCcw } from "lucide-react";

function TextToolWrapper({
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
      <CardContent className="space-y-4 pt-5">{children}</CardContent>
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
    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
    };
  }, [text]);

  return (
    <TextToolWrapper title="Word & Character Counter">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <label htmlFor="word-counter-input" className="font-medium text-slate-700">
            Input Text
          </label>
          {text.length > 0 && (
            <button
              type="button"
              onClick={() => setText("")}
              className="text-slate-400 hover:text-red-600 transition-colors inline-flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
        <Textarea
          id="word-counter-input"
          placeholder="Paste or type text to analyze length, reading time, and density metrics..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          className="min-h-[180px] font-mono text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 pt-1">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters (total)", value: stats.characters },
          { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Est. Reading Time", value: `${stats.readingTime} min` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border border-slate-200 bg-slate-50/50 p-3 text-center space-y-0.5"
          >
            <p className="font-mono text-xl font-bold text-slate-900 tabular-nums">
              {stat.value}
            </p>
            <p className="text-[11px] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </TextToolWrapper>
  );
}

export function CaseConverterTool() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

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
          text
            .toLowerCase()
            .replace(/(^\w|\.\s+\w)/g, (c) => c.toUpperCase())
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
      default:
        break;
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TextToolWrapper title="Case Converter">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <label htmlFor="case-input" className="font-medium text-slate-700">
            Source Text
          </label>
          {text.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setText("");
                setOutput("");
              }}
              className="text-slate-400 hover:text-red-600 transition-colors inline-flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
        <Textarea
          id="case-input"
          placeholder="Enter text to convert letter casing..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { label: "UPPERCASE", type: "upper" },
          { label: "lowercase", type: "lower" },
          { label: "Title Case", type: "title" },
          { label: "Sentence case", type: "sentence" },
          { label: "aLtErNaTiNg", type: "alternating" },
        ].map((btn) => (
          <Button
            key={btn.type}
            variant="outline"
            size="sm"
            onClick={() => convert(btn.type)}
            disabled={!text.trim()}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      {output && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-700">Converted Result</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 text-xs gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy to clipboard</span>
                </>
              )}
            </Button>
          </div>
          <Textarea value={output} readOnly className="min-h-[120px] bg-slate-50/50" />
        </div>
      )}
    </TextToolWrapper>
  );
}

export function RemoveDuplicateLinesTool() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const removedCount = text
    ? text.split("\n").length - result.split("\n").length
    : 0;

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TextToolWrapper title="Remove Duplicate Lines">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <label htmlFor="dup-input" className="font-medium text-slate-700">
            Input Lines
          </label>
          {text.length > 0 && (
            <button
              type="button"
              onClick={() => setText("")}
              className="text-slate-400 hover:text-red-600 transition-colors inline-flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
        <Textarea
          id="dup-input"
          placeholder="Paste line-separated text or CSV list to deduplicate..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          className="min-h-[140px] font-mono text-xs"
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaseSensitive(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-slate-900"
          />
          Case-sensitive matching
        </label>

        {text && (
          <span className="text-xs text-slate-500 tabular-nums">
            Removed{" "}
            <strong className="font-semibold text-slate-900">
              {removedCount}
            </strong>{" "}
            duplicate line(s)
          </span>
        )}
      </div>

      {text && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-700">Deduplicated Output</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 text-xs gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy to clipboard</span>
                </>
              )}
            </Button>
          </div>
          <Textarea value={result} readOnly className="min-h-[140px] bg-slate-50/50 font-mono text-xs" />
        </div>
      )}
    </TextToolWrapper>
  );
}

export function TextCleanerTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
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

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TextToolWrapper title="Text Cleaner & Normalizer">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <label htmlFor="clean-input" className="font-medium text-slate-700">
            Source Text
          </label>
          {text.length > 0 && (
            <button
              type="button"
              onClick={() => setText("")}
              className="text-slate-400 hover:text-red-600 transition-colors inline-flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
        <Textarea
          id="clean-input"
          placeholder="Paste text with redundant line breaks, trailing tabs, or double spaces..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          className="min-h-[140px]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-md border border-slate-200 bg-slate-50/50">
        {[
          { key: "trimLines", label: "Trim leading & trailing whitespace per line" },
          { key: "removeExtraSpaces", label: "Collapse multiple spaces into single space" },
          { key: "normalizeBreaks", label: "Normalize CRLF (Windows) breaks to standard LF" },
          { key: "removeEmptyLines", label: "Strip completely empty lines" },
        ].map((opt) => (
          <label
            key={opt.key}
            className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={options[opt.key as keyof typeof options]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOptions({ ...options, [opt.key]: e.target.checked })
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-slate-900"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {text && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-700">Cleaned Result</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 text-xs gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy to clipboard</span>
                </>
              )}
            </Button>
          </div>
          <Textarea value={result} readOnly className="min-h-[140px] bg-slate-50/50" />
        </div>
      )}
    </TextToolWrapper>
  );
}
