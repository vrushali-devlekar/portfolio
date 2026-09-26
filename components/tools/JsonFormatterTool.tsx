"use client";

import { useState } from "react";

const SAMPLE_JSON = `{
  "developer": "Vrushali Devlekar",
  "role": "Full-Stack Engineer",
  "specializations": [
    "Next.js",
    "Three.js",
    "TypeScript",
    "WebRTC"
  ],
  "metrics": {
    "latency": "< 90ms",
    "productionUptime": 99.99
  },
  "openSource": true
}`;

export default function JsonFormatterTool() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<number | string>(2);
  const [errorInfo, setErrorInfo] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const getIndentSpaces = () => {
    if (indent === "tab") return "\t";
    return Number(indent);
  };

  const handleFormat = () => {
    if (!input.trim()) {
      setErrorInfo({ message: "Input is empty. Please enter or paste valid JSON." });
      setIsValid(false);
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, getIndentSpaces());
      setOutput(formatted);
      setErrorInfo(null);
      setIsValid(true);
    } catch (err: unknown) {
      setIsValid(false);
      parseJsonError(err);
      setOutput("");
    }
  };

  const handleValidate = () => {
    if (!input.trim()) {
      setErrorInfo({ message: "Input is empty. Please enter or paste JSON to validate." });
      setIsValid(false);
      return;
    }

    try {
      JSON.parse(input);
      setErrorInfo(null);
      setIsValid(true);
    } catch (err: unknown) {
      setIsValid(false);
      parseJsonError(err);
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setErrorInfo({ message: "Input is empty." });
      setIsValid(false);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setErrorInfo(null);
      setIsValid(true);
    } catch (err: unknown) {
      setIsValid(false);
      parseJsonError(err);
    }
  };

  const parseJsonError = (err: unknown) => {
    if (err instanceof Error) {
      // Extract line/column if present in standard syntax error message
      const match = err.message.match(/at position (\d+)/i) || err.message.match(/line (\d+) column (\d+)/i);
      if (match) {
        setErrorInfo({
          message: `Syntax Error: ${err.message}`,
        });
      } else {
        setErrorInfo({
          message: `Invalid JSON: ${err.message}. Check unescaped quotes or trailing commas.`,
        });
      }
    } else {
      setErrorInfo({ message: "Invalid JSON format." });
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setErrorInfo(null);
    setIsValid(null);
  };

  const handleCopy = async () => {
    const textToCopy = output || input;
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
    setErrorInfo(null);
    setIsValid(null);
    setOutput("");
  };

  const lineCount = input ? input.split("\n").length : 0;
  const charCount = input.length;

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="p-4 rounded-2xl bg-[#0f1015] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Indent Selector */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-400">Indentation:</span>
          <select
            value={indent}
            onChange={(e) => setIndent(e.target.value === "tab" ? "tab" : Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
            aria-label="Select JSON Indentation"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value="tab">Tab</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleFormat}
            className="px-4 py-2 rounded-xl bg-[#f5b907] hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <i className="ri-magic-line" />
            <span>Format</span>
          </button>
          <button
            onClick={handleValidate}
            className="px-3.5 py-2 rounded-xl border border-white/15 hover:border-white text-zinc-300 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all bg-white/[0.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <i className="ri-checkbox-circle-line mr-1 text-emerald-400" />
            <span>Validate</span>
          </button>
          <button
            onClick={handleMinify}
            className="px-3.5 py-2 rounded-xl border border-white/15 hover:border-white text-zinc-300 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all bg-white/[0.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <i className="ri-contract-left-right-line mr-1 text-cyan-400" />
            <span>Minify</span>
          </button>
          <button
            onClick={handleLoadSample}
            className="px-3.5 py-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white font-mono text-xs transition-all bg-white/[0.02]"
          >
            Sample
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 font-mono text-xs transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Diagnostics Alert */}
      {isValid === true && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ri-checkbox-circle-fill text-base" />
            <span>Valid JSON. Structure parsed successfully with 0 errors.</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20">OK</span>
        </div>
      )}

      {errorInfo && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-start gap-2.5">
          <i className="ri-error-warning-fill text-base shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Syntax Diagnostic:</span>
            <p className="text-red-300/90">{errorInfo.message}</p>
          </div>
        </div>
      )}

      {/* Dual Column Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT COLUMN */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
            <span className="font-semibold text-white uppercase tracking-wider">// RAW INPUT JSON</span>
            <span>{lineCount} lines | {charCount} chars</span>
          </div>
          <div className="relative rounded-2xl bg-[#0a0c10] border border-white/10 overflow-hidden focus-within:border-amber-400/50 shadow-inner">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste raw JSON here..."
              rows={16}
              className="w-full p-4 bg-transparent text-zinc-200 font-mono text-xs leading-relaxed focus:outline-none resize-y"
              spellCheck={false}
              aria-label="Input JSON Text"
            />
          </div>
        </div>

        {/* OUTPUT COLUMN */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
            <span className="font-semibold text-white uppercase tracking-wider">// FORMATTED OUTPUT</span>
            <button
              onClick={handleCopy}
              disabled={!output && !input}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white text-zinc-200 hover:text-black transition-colors font-mono text-[11px] flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <i className={copied ? "ri-check-line text-emerald-400" : "ri-file-copy-line"} />
              <span>{copied ? "Copied!" : "Copy Output"}</span>
            </button>
          </div>
          <div className="relative rounded-2xl bg-[#0a0c10] border border-white/10 overflow-hidden shadow-inner">
            <textarea
              value={output || (isValid === true ? "Click 'Format' to display formatted JSON" : "")}
              readOnly
              placeholder="Formatted JSON will appear here..."
              rows={16}
              className="w-full p-4 bg-transparent text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-y select-all"
              spellCheck={false}
              aria-label="Formatted JSON Output"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
