/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, X, Phone, Mail, FileText, ExternalLink, Linkedin, Github } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import GalaxyBackground from "./components/GalaxyBackground";
import { PERSONAL_DETAILS } from "./data";

export default function App() {
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 overflow-x-hidden font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200 relative">
      {/* Dynamic Galaxy Background layer */}
      <GalaxyBackground />

      {/* Global Header & Nav bar */}
      <Navbar onOpenQuickContact={() => setIsQuickContactOpen(true)} />

      {/* Structured Sections */}
      <main className="relative">
        {/* Core Profile Hero */}
        <Hero />

        {/* Brand Summary Section */}
        <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-5 h-full flex flex-col justify-center">
              <span className="text-xs uppercase font-mono tracking-wider text-indigo-400 block mb-2 font-semibold">ABOUT THE ENGINEER</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Software Engineer with Support Engineering Acumen
              </h2>
              <div className="mt-4 h-1 w-12 bg-indigo-500 rounded-full"></div>
            </div>
            
            <div className="lg:col-span-7">
              <p className="text-base sm:text-lg text-slate-350 leading-relaxed font-sans mb-6">
                I am a passionate software professional specialized in handling frontend layout structures, relational queries, structured Python logic representations, and diagnostics.
              </p>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
                Having operated in remote software support environments, technical ticket management, and full-stack development, I excel at diagnosing application bugs, monitoring system uptimes, and translating complex challenges into robust code. My design approach centers on reliability, usability, and optimal technical alignment.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Stack Grid */}
        <Skills />

        {/* Project Showrooms */}
        <Projects />

        {/* Professional Milestones */}
        <Experience />

        {/* Academic History */}
        <Education />

        {/* Contact form & Boards */}
        <Contact />
      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-950/60 border-t border-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="font-display font-black text-white text-lg tracking-tight">
              {PERSONAL_DETAILS.name}
            </span>
            <span className="block font-mono text-[10px] text-slate-500 mt-1 uppercase">
              RELIABLE WEB DEV & SUPPORT SERVICES • 2026 COPYRIGHT
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-slate-500">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
          </div>
        </div>
      </footer>

      {/* Connect overlay drawer/modal */}
      <AnimatePresence>
        {isQuickContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
              onClick={() => setIsQuickContactOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10 p-6 text-left"
            >
              <button
                onClick={() => setIsQuickContactOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Close connects"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <h3 className="font-display font-extrabold text-lg text-white mb-1">
                Direct Coordinates
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Copy direct credentials for immediate recruiting discussions.
              </p>

              <div className="space-y-3.5 mb-6">
                {/* Email copy bar */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-300 truncate select-all">{PERSONAL_DETAILS.email}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_DETAILS.email, "email")}
                    className="p-1.5 rounded hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedText === "email" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* Phone copy bar */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-300 select-all">+91 {PERSONAL_DETAILS.phone}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_DETAILS.phone, "phone")}
                    className="p-1.5 rounded hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer"
                    title="Copy phone to clipboard"
                  >
                    {copiedText === "phone" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`mailto:${PERSONAL_DETAILS.email}`}
                  className="flex-1 py-2 px-3 text-center rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-display text-xs font-semibold shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5" /> Launch Mailer
                </a>
                <button
                  onClick={() => {
                    setIsQuickContactOpen(false);
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 py-2 px-3 text-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-display text-xs font-semibold transition-all cursor-pointer"
                >
                  Message Form
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

