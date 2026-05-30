import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { FolderGit, ArrowUpRight, Award, MessageCircle, Mic, BookOpen, Layers } from "lucide-react";
import ProjectDetailsModal from "./ProjectDetailsModal";

export default function Projects() {
  const [filter, setFilter] = useState<"ALL" | "COLLEGE" | "PERSONAL">("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === "ALL") return true;
    if (filter === "COLLEGE") return proj.type === "College Project";
    if (filter === "PERSONAL") return proj.type === "Personal Project";
    return true;
  });

  const getIcon = (id: string) => {
    switch (id) {
      case "chat-boot":
        return MessageCircle;
      case "voice-recognition":
        return Mic;
      case "bookpedia":
        return BookOpen;
      default:
        return FolderGit;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Decorative Blur light */}
      <div className="absolute top-[30%] right-0 w-[300px] h-[300px] bg-emerald-500/[0.03] rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase font-mono">Portfolio Showcase</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Handcrafted Web Applications
          </p>
          <div className="mt-4 h-1 w-12 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 font-sans text-sm sm:text-base">
            Detailed compilation of academic developments and personal research projects. Filter by category to analyze exact specifications.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center gap-1.5 p-1 bg-slate-950/80 border border-slate-800/80 rounded-xl mb-12 max-w-sm mx-auto">
          {(["ALL", "COLLEGE", "PERSONAL"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`flex-1 py-2 px-3 rounded-lg font-display text-xs font-bold transition-all cursor-pointer ${
                filter === type
                  ? "bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {type === "ALL" ? "All Apps" : type === "COLLEGE" ? "College" : "Personal"}
            </button>
          ))}
        </div>

        {/* Projects Grid Display */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const IconComponent = getIcon(project.id);
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProject(project)}
                  className="group rounded-2xl glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between min-h-[380px] border border-slate-800 cursor-pointer text-left relative"
                >
                  <div className="p-6 sm:p-7">
                    {/* Top strip and category */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-wider border border-emerald-500/20">
                        {project.type}
                      </span>
                      {/* Metric Tag badge */}
                      {(project.engagementIncrease || project.accuracyMetric) && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-medium">
                          <Award className="h-3.5 w-3.5" />
                          {project.engagementIncrease ? `Engagement +${project.engagementIncrease}` : `Accuracy ${project.accuracyMetric}`}
                        </span>
                      )}
                    </div>

                    {/* App icon avatar placeholder */}
                    <div className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 group-hover:scale-105 transition-transform duration-300 mb-6">
                      <IconComponent className="h-6 w-6" />
                    </div>

                    {/* Typography */}
                    <h3 className="font-display font-extrabold text-lg text-white mb-3 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      {project.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-slate-400" />
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech item lists */}
                  <div className="px-6 py-4.5 bg-slate-950/40 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                    {project.techUsed.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-500 border border-slate-800/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techUsed.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-600 self-center pl-1">
                        +{project.techUsed.length - 3} more
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail Overlay modal popup */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
