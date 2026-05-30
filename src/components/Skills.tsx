import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILL_CATEGORIES } from "../data";
import { 
  Code, BookOpen, Database, Hammer, Milestone, Briefcase, HelpCircle, 
  CheckCircle, Webhook, Monitor, RefreshCw, Brain 
} from "lucide-react";

// Register icons with Devicon styles or Lucide fallback icons for high-end design
const SKILL_ICONS: Record<string, { type: "devicon" | "lucide"; value: string | React.ComponentType<any> }> = {
  "JavaScript": { type: "devicon", value: "devicon-javascript-plain colored" },
  "Java": { type: "devicon", value: "devicon-java-plain colored" },
  "C": { type: "devicon", value: "devicon-c-plain colored" },
  "C++": { type: "devicon", value: "devicon-cplusplus-plain colored" },
  "HTML": { type: "devicon", value: "devicon-html5-plain colored" },
  "CSS": { type: "devicon", value: "devicon-css3-plain colored" },
  "Python": { type: "devicon", value: "devicon-python-plain colored" },
  "React.js": { type: "devicon", value: "devicon-react-original colored" },
  "Tailwind CSS": { type: "devicon", value: "devicon-tailwindcss-original colored" },
  "Next.js": { type: "devicon", value: "devicon-nextjs-plain text-slate-200" },
  "Framer Motion": { type: "devicon", value: "devicon-framer-original text-pink-400" },
  "HTML5": { type: "devicon", value: "devicon-html5-plain colored" },
  "CSS3": { type: "devicon", value: "devicon-css3-plain colored" },
  "Responsive Design": { type: "lucide", value: Monitor },
  "Node.js": { type: "devicon", value: "devicon-nodejs-plain colored" },
  "Express.js": { type: "devicon", value: "devicon-express-original text-slate-200" },
  "RESTful APIs": { type: "lucide", value: Webhook },
  "MySQL": { type: "devicon", value: "devicon-mysql-plain colored" },
  "MongoDB": { type: "devicon", value: "devicon-mongodb-plain colored" },
  "Git": { type: "devicon", value: "devicon-git-plain colored" },
  "GitHub": { type: "devicon", value: "devicon-github-original text-slate-100" },
  "Appwrite": { type: "devicon", value: "devicon-appwrite-plain colored" },
  "Agile Methodologies": { type: "lucide", value: RefreshCw },
  "Quick Learner": { type: "lucide", value: Brain },
  "Flask": { type: "devicon", value: "devicon-flask-original text-slate-200" }
};

// Elegant icon rendering helper supporting both standards
function SkillIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const iconData = SKILL_ICONS[name];
  if (!iconData) {
    return <Code className={`${className} text-emerald-400`} />;
  }

  if (iconData.type === "devicon") {
    return <i className={`${iconData.value} ${className} flex items-center justify-center`} style={{ fontSize: "1.25rem", lineHeight: 1 }} />;
  }

  const LucideIcon = iconData.value as React.ComponentType<any>;
  return <LucideIcon className={`${className} text-emerald-400`} />;
}

// Map skills to CV-proven context to show genuine depth without hallucination!
const SKILL_CONTEXTS: Record<string, { usedIn: string; details: string }> = {
  "JavaScript": {
    usedIn: "Anudip Foundation, Nippon Data",
    details: "Utilized for full-stack React.js client state rendering, supporting core frontend logic, and resolving runtime errors."
  },
  "React.js": {
    usedIn: "Anudip Foundation, Support hotfixes",
    details: "Engineered responsive state-driven components, connected REST APIs, and managed reactive UI states."
  },
  "Next.js": {
    usedIn: "Web Development Portfolio",
    details: "Experienced in constructing modern optimized React structures with responsive design principles."
  },
  "Framer Motion": {
    usedIn: "Interactive Porfolio Assets",
    details: "Employed to design high-performance spring dynamics, micro-interactions, layout transitions, and fluid overlays."
  },
  "Java": {
    usedIn: "Anudip Foundation Internship",
    details: "Mastered full core concepts: OOPs syntax, detailed exception safe architectures, generic collections, File I/O, and concurrent multithreading."
  },
  "Python": {
    usedIn: "Chat-Boot, Voice Recognition App",
    details: "Built lightweight Flask engines, orchestrated natural language libraries (OpenAI, Speech Preprocessing), and routed voice commands."
  },
  "Node.js": {
    usedIn: "Anudip Foundation Internship",
    details: "Constructed local services, connected frontend modules to APIs, and managed node dependency servers."
  },
  "Express.js": {
    usedIn: "Anudip Foundation, Backend REST",
    details: "Orchestrated backend server routes to securely exchange requests and perform API handling workflows."
  },
  "MySQL": {
    usedIn: "MCA Academic Database Management",
    details: "Practiced standard relational queries (RDBMS, schemas, ACID operations, software engineering paradigms)."
  },
  "MongoDB": {
    usedIn: "Nippon Data, Chat-Boot Project",
    details: "Performed complex backend queries for data verification, session storage, query logs, system recovery, and client troubleshooting."
  },
  "Git": {
    usedIn: "Nippon Data, Anudip Foundation",
    details: "Managed branching, commits, stash states, and issue tagging cycles in structured team ecosystems."
  },
  "GitHub": {
    usedIn: "Collaboration & Repos",
    details: "Managed code reviews, pull requests, open-source documentation, and team sprint pipelines."
  },
  "Appwrite": {
    usedIn: "Modern Serverless Pipelines",
    details: "Maintained cloud authentication states, document stores, and back-end integration models."
  },
  "Flask": {
    usedIn: "Multiple Backend Projects",
    details: "Built microservices for voice signal preprocessing, real-time command routing, and custom chat endpoints."
  },
  "RESTful APIs": {
    usedIn: "Nippon Data, Anudip Intern",
    details: "Consumed, parsed, validated, and optimized client-server REST contracts for dynamic frontends."
  },
  "Responsive Design": {
    usedIn: "Nippon Data Support, Anudip",
    details: "Ensured beautiful viewport adaptations (fluid containers, touch metrics) across desktop and mobile devices."
  },
  "Agile Methodologies": {
    usedIn: "Team projects, Nippon Support",
    details: "Cooperated in iterative sprints, stand-ups, ticket updates, and client technical support loops."
  },
  "Quick Learner": {
    usedIn: "Nippon Support Staff Role",
    details: "Quickly adapted to Nippon Enterprise platforms, Aditya Birla system procedures, and modern React 19 frameworks."
  }
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("languages");
  const [selectedSkill, setSelectedSkill] = useState<string | null>("React.js");

  const icons: Record<string, any> = {
    languages: Code,
    frontend: BookOpen,
    backend: Hammer,
    databases: Database,
    tools: Hammer,
    other: Milestone
  };

  const activeCategory = SKILL_CATEGORIES.find((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-24 bg-slate-950/20 border-y border-slate-900 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-emerald-500/[0.03] rounded-full filter blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase font-mono">Expertise</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Technical Skillset
          </p>
          <div className="mt-4 h-1 w-12 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 font-sans text-sm sm:text-base">
            Clean architectures and support operations require a broad range of technologies. Here is the stack I use to build and support production software.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Menu (3 cols) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none shrink-0">
            {SKILL_CATEGORIES.map((category) => {
              const TabIcon = icons[category.id] || Code;
              const isSelected = category.id === activeTab;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left font-display font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer lg:w-full ${
                    isSelected
                      ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/15"
                      : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                  }`}
                >
                  <TabIcon className="h-4.5 w-4.5 shrink-0" />
                  <span>{category.title}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Skill Tags (7 cols) */}
            <div className="md:col-span-7 glass-panel rounded-2xl border border-slate-800 p-6 flex flex-col min-h-[320px]">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-5">
                <span className="font-display font-bold text-sm tracking-wide uppercase text-emerald-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {activeCategory?.title}
                </span>
                <span className="text-slate-500 font-mono text-[10px]">Click any item to verify proven usage</span>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-wrap gap-2.5 w-full"
                  >
                    {activeCategory?.skills.map((skill) => {
                      const isSelected = selectedSkill === skill;
                      return (
                        <button
                          key={skill}
                          onClick={() => setSelectedSkill(skill)}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer group ${
                            isSelected
                              ? "bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 shadow-sm"
                              : "bg-slate-950/60 border border-slate-800/60 text-slate-300 hover:border-slate-700 hover:text-white"
                          }`}
                        >
                          <div className={`transition-all duration-300 ${isSelected ? "scale-105" : "group-hover:scale-110"}`}>
                            <SkillIcon name={skill} className="h-5 w-5 shrink-0" />
                          </div>
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Live Audit Details Panel (5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-br from-emerald-950/10 to-slate-950/40 rounded-2xl border border-slate-800/80 p-6 min-h-[320px] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-2">Proven Track Record</span>
                
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-900/60">
                  <div className="p-2 bg-slate-950/90 border border-slate-800/80 rounded-xl flex items-center justify-center shadow-inner">
                    {selectedSkill && <SkillIcon name={selectedSkill} className="h-6 w-6 shrink-0" />}
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    {selectedSkill ? selectedSkill : "Select a skill"}
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  {selectedSkill && SKILL_CONTEXTS[selectedSkill] ? (
                    <motion.div
                      key={selectedSkill}
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-medium text-emerald-400/85 uppercase block flex items-center gap-1.5 font-semibold">
                          <Briefcase className="h-3 w-3" /> APPLIED AT:
                        </span>
                        <p className="text-xs font-semibold text-slate-300">
                          {SKILL_CONTEXTS[selectedSkill].usedIn}
                        </p>
                      </div>

                      <div className="space-y-1 block max-h-[140px] overflow-y-auto pr-1">
                        <span className="text-[10px] font-mono font-medium text-emerald-400/85 uppercase block flex items-center gap-1.5 font-semibold">
                          <BookOpen className="h-3 w-3" /> USE CASE DETAIL:
                        </span>
                        <p className="text-xs leading-relaxed text-slate-400 font-sans">
                          {SKILL_CONTEXTS[selectedSkill].details}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-slate-500 text-xs py-10 flex flex-col items-center justify-center gap-2 h-full text-center">
                      <HelpCircle className="h-7 w-7 text-slate-700" />
                      <span>Select any compiled skill to overview direct professional and academic deployment history.</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {selectedSkill && (
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-emerald-400 font-mono">
                  <span>$ diagnostic.check()</span>
                  <span>STATUS: READY</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
