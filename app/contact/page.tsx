"use client";

import { useMutation } from "@tanstack/react-query";
import { submitContactForm, ContactPayload } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const mutation = useMutation({
    mutationFn: (data: ContactPayload) => submitContactForm(data),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload: ContactPayload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };
    mutation.mutate(payload);
  };

  return (
    <ErrorBoundary>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="flex-grow py-24 px-6 flex items-center justify-center min-h-screen">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start mt-8">
            
            {/* Left Contact Side */}
            <motion.div
              className="md:col-span-5 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent text-glow">
                  Get in Touch
                </span>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none mt-3 uppercase">
                  Let&apos;s build <br />
                  something <br />
                  <em className="text-accent not-italic font-extralight text-glow">together</em>
                </h1>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:vrushali.devlekar@gmail.com"
                  className="flex items-center gap-3 p-4 bg-card/25 border border-border/80 rounded-xl hover:border-accent/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <i className="ri-mail-line text-lg text-muted-foreground"></i>
                  <span className="text-xs sm:text-sm text-muted-foreground">vrushali.devlekar@gmail.com</span>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/vrushali-devlekar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-card/25 border border-border/80 rounded-xl hover:border-accent/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <i className="ri-linkedin-box-fill text-lg text-muted-foreground"></i>
                  <span className="text-xs sm:text-sm text-muted-foreground">linkedin.com/in/vrushali-devlekar</span>
                </a>

                <a
                  href="https://github.com/vrushali-devlekar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-card/25 border border-border/80 rounded-xl hover:border-accent/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <i className="ri-github-fill text-lg text-muted-foreground"></i>
                  <span className="text-xs sm:text-sm text-muted-foreground">github.com/vrushali-devlekar</span>
                </a>

                <div className="flex items-center gap-3 p-4 bg-card/25 border border-border/80 rounded-xl">
                  <i className="ri-map-pin-line text-lg text-muted-foreground"></i>
                  <span className="text-xs sm:text-sm text-muted-foreground">Mumbai, India</span>
                </div>
              </div>
            </motion.div>

            {/* Right Contact Form / Success state */}
            <motion.div
              className="md:col-span-7 bg-card/35 border border-border/80 p-6 sm:p-8 rounded-2xl shadow-sm border-glow backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <AnimatePresence mode="wait">
                {mutation.isSuccess && mutation.data?.success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-10 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                      <i className="ri-checkbox-circle-line text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      Thank you for reaching out! Your message has been sent successfully. I will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => mutation.reset()}
                      className="px-5 py-2.5 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-lg hover:opacity-95 transition-all"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Your Name</label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Alex Morgan"
                          required
                          className="w-full bg-background border border-border/80 focus:border-accent/70 focus:outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-accent/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Email Address</label>
                        <input
                          name="email"
                          type="email"
                          placeholder="alex@company.com"
                          required
                          className="w-full bg-background border border-border/80 focus:border-accent/70 focus:outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-accent/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Subject</label>
                      <select
                        name="subject"
                        required
                        defaultValue=""
                        className="w-full bg-background border border-border/80 focus:border-accent/70 focus:outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-accent/40 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select an option…</option>
                        <option value="Freelance Project">Freelance Project</option>
                        <option value="Full-time Opportunity">Full-time Opportunity</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Just saying hi">Just saying hi</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Message</label>
                      <textarea
                        name="message"
                        placeholder="Tell me about your project, timeline, and budget…"
                        required
                        rows={5}
                        className="w-full bg-background border border-border/80 focus:border-accent/70 focus:outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-accent/40 resize-none"
                      ></textarea>
                    </div>

                    {mutation.isError && (
                      <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl text-xs font-medium">
                        <i className="ri-error-warning-line"></i>
                        <span>{mutation.error?.message || "An unexpected error occurred."}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <span className="text-[11px] text-muted-foreground">Your details remain private.</span>
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full sm:w-auto px-6 py-3 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                      >
                        {mutation.isPending ? (
                          <>
                            Sending... <i className="ri-loader-4-line ri-spin text-base"></i>
                          </>
                        ) : (
                          <>
                            Send Message <i className="ri-arrow-right-line"></i>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </ErrorBoundary>
  );
}
