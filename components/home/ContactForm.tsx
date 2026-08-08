"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Linkedin, Github, Twitter, CheckCircle2, AlertCircle, Loader2, Terminal } from "lucide-react";
import { submitContactForm } from "@/lib/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", msg: "Please fill out all required fields." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        setStatus({ type: "success", msg: "Thank you! Your message has been transmitted successfully." });
        setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
      } else {
        setStatus({ type: "error", msg: res.message || "Something went wrong. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "A network error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/vrushali-devlekar", icon: <Github className="w-4 h-4 text-[#E05638]" /> },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vrushali-devlekar/", icon: <Linkedin className="w-4 h-4 text-[#E05638]" /> },
    { label: "Twitter / X", href: "https://x.com/vrushali_i", icon: <Twitter className="w-4 h-4 text-[#E05638]" /> },
    { label: "Direct Email", href: "mailto:vrushalidevlekar12@gmail.com", icon: <Mail className="w-4 h-4 text-[#E05638]" /> },
  ];

  return (
    <section className="py-24 px-6 bg-[#141418] relative border-t border-black text-white" id="contact">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E05638]/30 bg-[#E05638]/10 mb-4 text-[#E05638]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E05638] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
              07 // Get In Touch
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Let&apos;s Build <span className="italic text-[#E05638]">Together</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed font-sans">
            Have a project in mind, need backend engineering expertise, or want to discuss full-stack opportunities? Drop me a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Links & Info (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E05638] font-bold uppercase">
                <Terminal className="w-4 h-4" />
                <span>Contact Terminal</span>
              </div>
              
              <h3 className="text-xl font-serif font-bold text-white">
                Contact Details
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Available for freelance engineering contracts, full-time remote developer positions, and architecture consultations.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#E05638]/50 hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-300 group-hover:text-white">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-[#E05638] transition-colors">
                      Connect →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Terminal-Style Interactive Contact Form (Col 7) */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-white/5 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {status && (
                <div
                  className={`p-4 rounded-xl text-xs font-mono flex items-center gap-3 ${
                    status.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{status.msg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Name <span className="text-[#E05638]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E05638] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Email <span className="text-[#E05638]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E05638] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Microservice Architecture Project"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E05638] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                  Message <span className="text-[#E05638]">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E05638] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#E05638] hover:bg-[#c94529] text-white font-mono font-semibold text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
