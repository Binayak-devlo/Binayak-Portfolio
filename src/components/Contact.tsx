import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, ExternalLink, Send, CheckCircle, Trash2, ArrowUpRight, Github, Linkedin, MapPin, Terminal } from "lucide-react";
import { PERSONAL_DETAILS } from "../data";
import { ContactInquiry } from "../types";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Recruitment Inquiry",
    message: ""
  });
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("binayak_portfolio_inquiries");
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading from localstorage", e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);

    setTimeout(() => {
      const newInquiry: ContactInquiry = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        submittedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      try {
        localStorage.setItem("binayak_portfolio_inquiries", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save state to localStorage", err);
      }

      setFormData({
        name: "",
        email: "",
        subject: "Recruitment Inquiry",
        message: ""
      });
      setIsSending(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3500);
    }, 800);
  };

  const handleClearInquiries = () => {
    setInquiries([]);
    try {
      localStorage.removeItem("binayak_portfolio_inquiries");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Decorative Aura background */}
      <div className="absolute bottom-0 left-[20%] w-[45vw] h-[45vw] bg-emerald-650/[0.03] rounded-full filter blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase font-mono">Communications Hub</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Connect & Recruits
          </p>
          <div className="mt-4 h-1 w-12 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 font-sans text-sm sm:text-base">
            Reach out via phone, email, professional networks, or leave a simulated test message directly in his active browser sandbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Direct coordinates & social lists (4 spans) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6">
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Information Board
              </h3>
              
              <div className="space-y-4">
                {/* Email link widget */}
                <a
                  href={`mailto:${PERSONAL_DETAILS.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/40 border border-slate-850 hover:border-slate-700 hover:bg-slate-950/80 transition-all group"
                >
                  <div className="h-9 w-9 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <span className="block text-[9px] font-mono uppercase text-slate-500 tracking-wide">Direct Email</span>
                    <span className="block text-xs sm:text-sm text-slate-300 font-semibold group-hover:text-white transition-colors truncate">
                      {PERSONAL_DETAILS.email}
                    </span>
                  </div>
                </a>

                {/* Phone link widget */}
                <a
                  href={`tel:${PERSONAL_DETAILS.phone}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/40 border border-slate-850 hover:border-slate-700 hover:bg-slate-950/80 transition-all group"
                >
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] font-mono uppercase text-slate-500 tracking-wide">Mobile Endpoint</span>
                    <span className="block text-xs sm:text-sm text-slate-300 font-semibold group-hover:text-white transition-colors">
                      +91 {PERSONAL_DETAILS.phone}
                    </span>
                  </div>
                </a>

                {/* Location Map pin detail */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/10 border border-slate-850/60 cursor-default">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/5 flex items-center justify-center text-emerald-400/80">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] font-mono uppercase text-slate-500 tracking-wide">Service Area</span>
                    <span className="block text-xs sm:text-sm text-slate-400">
                      {PERSONAL_DETAILS.locationName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels section */}
              <div className="pt-4 border-t border-slate-800/80">
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-3 font-semibold">
                  Professional Channels
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <a
                    href={PERSONAL_DETAILS.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/30 hover:bg-emerald-500/10 border border-slate-850 text-slate-400 hover:text-emerald-400 transition-all text-xs"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Linkedin className="h-4.5 w-4.5 text-emerald-400" /> LinkedIn Profile
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={PERSONAL_DETAILS.gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/30 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-all text-xs"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Github className="h-4.5 w-4.5" /> GitHub Repositories
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={PERSONAL_DETAILS.nakuri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/30 hover:bg-amber-500/10 border border-slate-850 text-slate-400 hover:text-amber-400 transition-all text-xs"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <div className="h-3.5 w-3.5 bg-slate-400 text-slate-950 text-[8px] rounded flex items-center justify-center font-black">N</div>
                      Naukri / Nakuri Verification
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Inquiry Form (8 spans, split in md format into form / local board) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
            {/* Input fields */}
            <div className="md:col-span-7 glass-panel rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-extrabold text-lg text-white mb-1">
                  Inquiry Portal
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Compose a connection note to discuss software support operations or full-stack integrations.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-form-name" className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="contact-form-name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-850 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm text-white transition-all outline-none"
                        placeholder="Eg, Sarah Johnson"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-form-email" className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="contact-form-email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-850 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm text-white transition-all outline-none"
                        placeholder="Eg, sarah@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-form-subject" className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Discussion Topic
                    </label>
                    <select
                      name="subject"
                      id="contact-form-subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-850 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm text-white transition-all outline-none cursor-pointer"
                    >
                      <option value="Recruitment Inquiry">Recruitment / Contract Proposal</option>
                      <option value="Technical Support Consultation">Technical Support Helpdesk</option>
                      <option value="Coffee / Connect">Quick Professional Sync</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-form-message" className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      id="contact-form-message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-850 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm text-white transition-all outline-none resize-none leading-relaxed"
                      placeholder="Discuss technical capabilities, support contracts, or scheduling timelines..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending || !formData.name || !formData.email || !formData.message}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md shadow-emerald-600/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer mt-2"
                  >
                    {isSending ? (
                      <span>Encrypting transmission...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Secured Transmission
                      </>
                    )}
                  </button>
                </form>

                {/* Visual success modal */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 flex items-center gap-2 text-xs font-semibold"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      <span>Transmission completed! Your message was cached in LocalStorage.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Simulated Database / Received message timeline */}
            <div className="md:col-span-5 bg-gradient-to-br from-emerald-950/10 to-slate-950/40 rounded-2xl border border-slate-800/80 p-6 min-h-[320px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                    <Terminal className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                    <span>Inquiry Log Timeline</span>
                  </div>
                  {inquiries.length > 0 && (
                    <button
                      onClick={handleClearInquiries}
                      className="p-1 rounded hover:bg-slate-850 hover:text-rose-400 text-slate-500 transition-colors cursor-pointer"
                      title="Clear database logs"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                  {inquiries.length === 0 ? (
                    <div className="text-slate-500 text-xs py-10 flex flex-col items-center justify-center gap-2 text-center">
                      <Terminal className="h-8 w-8 text-slate-700" />
                      <span>Local inquiry log is empty. Try submitting the contact form to see how it writes to the sandboxed storage instantly.</span>
                    </div>
                  ) : (
                    inquiries.map((inq) => (
                      <div key={inq.id} className="p-3 bg-slate-950/80 border border-slate-850/80 rounded-xl space-y-1.5 text-left text-xs relative">
                        <div className="flex justify-between items-start gap-1">
                          <span className="font-semibold text-slate-200 truncate pr-4">{inq.name}</span>
                          <span className="text-[9px] font-mono text-slate-550 shrink-0 font-medium">{inq.submittedAt}</span>
                        </div>
                        <span className="block text-[10px] font-mono text-emerald-300 font-bold">{inq.subject}</span>
                        <p className="text-slate-400 font-serif leading-relaxed line-clamp-3 italic">
                          "{inq.message}"
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/60 mt-4 text-[10px] font-mono text-emerald-400/80 flex items-center justify-between">
                <span>LOCAL_STORAGE_DB: READ_OK</span>
                <span>RECORDS: {inquiries.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
