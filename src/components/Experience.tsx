import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EXPERIENCE_HISTORY } from "../data";
import { WorkExperience } from "../types";
import { Calendar, MapPin, Briefcase, ChevronDown, ChevronUp, Star, Shield, Terminal } from "lucide-react";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("nippon"); // default expand Nippon as it is the most current

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCompanyColor = (id: string) => {
    switch (id) {
      case "nippon":
        return "border-emerald-500 text-emerald-400 bg-emerald-500/10";
      case "anudip":
        return "border-teal-500 text-teal-400 bg-teal-500/10";
      case "aditya-birla":
        return "border-slate-450 text-slate-350 bg-slate-450/10";
      default:
        return "border-slate-500 text-slate-400 bg-slate-500/10";
    }
  };

  return (
    <section id="experience" className="py-24 bg-slate-950/15 border-t border-slate-900 relative">
      <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase font-mono">Professional Timeline</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Work Experience
          </p>
          <div className="mt-4 h-1 w-12 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 font-sans text-sm sm:text-base">
            Timeline mapping out support diagnostics, system administration coordinates, and full-stack development contributions.
          </p>
        </div>

        {/* Vertical Timeline Vector Stream */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Connector Line */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-800 opacity-20 -translate-x-1/2 hidden sm:block"></div>

          {EXPERIENCE_HISTORY.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const isLeft = index % 2 === 0;
            const badgeColors = getCompanyColor(exp.id);

            return (
              <div key={exp.id} className="relative mb-12 last:mb-0">
                {/* Timeline Node Point indicator */}
                <div className="absolute left-4 sm:left-1/2 top-4 -translate-x-1/2 z-20 hidden sm:block">
                  <div className={`h-10 w-10 rounded-full bg-slate-900 border-2 flex items-center justify-center transition-transform hover:scale-110 shadow-lg ${
                    exp.id === "nippon" ? "border-emerald-500 text-emerald-400" :
                    exp.id === "anudip" ? "border-teal-500 text-teal-400" : "border-slate-500 text-slate-400"
                  }`}>
                    <Briefcase className="h-4.5 w-4.5" />
                  </div>
                </div>

                {/* Content Card container wrapper split */}
                <div className={`flex flex-col sm:flex-row items-stretch sm:justify-between w-full`}>
                  {/* Left Column Spacer / Node aligner */}
                  <div className={`w-full sm:w-[45%] ${isLeft ? "sm:order-1" : "sm:order-2 hidden sm:block"}`}></div>

                  {/* Real Content Block */}
                  <div className={`w-full sm:w-[45%] pl-8 sm:pl-0 ${isLeft ? "sm:order-2" : "sm:order-1"}`}>
                    <motion.div
                      layout="position"
                      className="glass-panel rounded-2xl border border-slate-800 p-5 sm:p-6 text-left relative focus-within:ring-2 focus-within:ring-emerald-500 transition-shadow"
                    >
                      {/* Interactive click trigger */}
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="absolute top-5 right-5 p-1 rounded-lg hover:bg-slate-850/60 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title={isExpanded ? "Collapse Details" : "Expand Details"}
                      >
                        {isExpanded ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                      </button>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider border ${badgeColors}`}>
                          {exp.isRemote ? "Remote Support" : "On-Site Core"}
                        </span>
                        <span className="text-slate-500 font-mono text-xs flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {exp.period}
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-lg text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="font-display font-medium text-sm text-emerald-400 mb-4 flex items-center gap-1 bg-emerald-500/5 px-2 py-1 rounded inline-block">
                        {exp.company}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{exp.location}</span>
                      </div>

                      {/* Expandable Responsibility Bullets */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-t border-slate-800/80 pt-4 mt-4 space-y-3.5"
                          >
                            <div className="space-y-2.5">
                              {exp.responsibilities.map((resp, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-2"></span>
                                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                                    {resp}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Tech Stack pill tags list */}
                            {exp.techUsed && (
                              <div className="pt-4 border-t border-slate-800/60">
                                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                                  <Terminal className="h-3 w-3 text-emerald-400" />
                                  Active Skills Applied
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {exp.techUsed.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800/80"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!isExpanded && (
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          className="mt-2 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          Show responsibilities & applied stack <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
