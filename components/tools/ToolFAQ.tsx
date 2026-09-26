"use client";

import { useState } from "react";
import { ToolFAQ as FAQType } from "@/lib/toolsData";

interface Props {
  faqs: FAQType[];
  toolName: string;
}

export default function ToolFAQ({ faqs, toolName }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="mt-16 pt-12 border-t border-white/10" aria-labelledby="faq-heading">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>
        <h2 id="faq-heading" className="font-headline text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Common Questions About {toolName}
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#0f1015] border border-white/10 overflow-hidden transition-colors hover:border-white/20"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-expanded={isOpen}
              >
                <h3 className="font-headline text-sm sm:text-base font-semibold text-white">
                  {faq.question}
                </h3>
                <span className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-zinc-300 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-amber-400" : ""}`}>
                  <i className="ri-arrow-down-s-line" />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed border-t border-white/5">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
