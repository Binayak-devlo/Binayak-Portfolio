import { motion } from "motion/react";
import { X, Trophy, Code2, Cpu, CheckCircle2, ChevronRight, BarChart3, HelpCircle } from "lucide-react";
import { Project } from "../types";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Dialog Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10 p-0"
      >
        {/* Header Visual Bar */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 px-6 py-6 text-left relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-950/20 hover:bg-slate-950/40 text-white/90 hover:text-white transition-colors cursor-pointer"
            title="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
          
          <span className="inline-block px-2.5 py-1 rounded-md bg-white/14 text-white text-[10px] font-mono uppercase tracking-wider font-semibold mb-2">
            {project.type} {project.organization ? `| ${project.organization}` : ""}
          </span>
          <h3 className="font-display font-extrabold text-2xl text-white tracking-tight mr-8">
            {project.title}
          </h3>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-left">
          {/* Main Description */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-2.5">
              Overview
            </h4>
            <p className="text-sm font-sans text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights & Metrics */}
          { (project.engagementIncrease || project.accuracyMetric) && (
            <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 block font-medium">Proven Metric Outcome</span>
                <span className="text-xl font-display font-black text-white mt-0.5 block flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-400 shrink-0" />
                  {project.engagementIncrease ? `${project.engagementIncrease} User Engagement` : `${project.accuracyMetric} Transcription Accuracy`}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Verifiable outcome derived during actual development operations, showcasing functional performance.
              </p>
            </div>
          )}

          {/* Technical Scope Highlights */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-3.5">
              Technical Implementation Details
            </h4>
            <div className="space-y-3">
              {project.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Used */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-2.5">
              Technologies Utilized
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techUsed.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800/85"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info and close button */}
        <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono tracking-wider">
            Verified Academic & Personal Stack
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-display text-xs font-semibold cursor-pointer"
          >
            Close Profile Review
          </button>
        </div>
      </motion.div>
    </div>
  );
}
