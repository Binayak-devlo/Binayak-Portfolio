import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Play, Sparkles, Terminal, Copy, Check, ChevronRight, Server, Database, ShieldAlert, Cpu } from "lucide-react";
import { PERSONAL_DETAILS } from "../data";

interface HeroProps {
  onOpenSandbox: () => void;
}

export default function Hero({ onOpenSandbox }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [auditlogs, setAuditLogs] = useState<string[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const auditIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (auditIntervalRef.current) {
        clearInterval(auditIntervalRef.current);
      }
    };
  }, []);

  const codeString = `{
  "engineer": "${PERSONAL_DETAILS.name}",
  "capabilities": ["Full-Stack Web Dev", "Production Support"],
  "mainStack": ["React", "Java", "Node.js", "Python"],
  "databases": ["MongoDB", "MySQL"],
  "currentRole": "Software Support Staff at Nippon Data System Ltd.",
  "status": "Available for High-Impact Roles",
  "activeDiagnostics": true
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSystemAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setAuditProgress(0);
    setAuditLogs(["[SYSTEM INIT] Requesting self-diagnostic credentials... OK"]);

    const diagnostics = [
      "[INFO] Resolving endpoint configurations to remote services...",
      "[SYSTEM] Loading credentials for MongoDB instances -- SECURED",
      "[SUPPORT CLIENT] Validating SLA tickets for client applications...",
      "[FRONTEND VERIFICATION] Testing React component bundles -- RESPONSIVE",
      "[BACKEND DEPLOYMENT] Verifying Flask API models & OpenAI handlers -- PASS",
      "[COMPLETED] All tests ran. 0 failures. Binayak Patri is ready to build!"
    ];

    if (auditIntervalRef.current) {
      clearInterval(auditIntervalRef.current);
    }

    let count = 0;
    auditIntervalRef.current = setInterval(() => {
      if (count < diagnostics.length) {
        const nextLog = diagnostics[count];
        if (nextLog) {
          setAuditLogs((prev) => [...prev, nextLog]);
        }
        setAuditProgress(((count + 1) / diagnostics.length) * 100);
        count++;
      } else {
        if (auditIntervalRef.current) {
          clearInterval(auditIntervalRef.current);
          auditIntervalRef.current = null;
        }
        setIsAuditing(false);
      }
    }, 750);
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background aura animations */}
      <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-emerald-600/5 rounded-full filter blur-[120px] mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] bg-emerald-400/10 rounded-full filter blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      <div className="absolute inset-0 bg-[#020617] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Copy (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left lg:pr-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
              <span>Available for Technical Commitments</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-6"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300">{PERSONAL_DETAILS.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display font-medium text-lg sm:text-xl text-slate-300 mb-4 max-w-xl"
            >
              {PERSONAL_DETAILS.title}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base text-slate-400 mb-8 max-w-2xl leading-relaxed font-sans"
            >
              {PERSONAL_DETAILS.aboutSummary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display text-base font-semibold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer group text-center"
              >
                View Handcrafted Projects
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700/60 hover:bg-slate-850 hover:border-slate-600 text-slate-300 hover:text-white font-display text-base font-semibold transition-all cursor-pointer text-center"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 w-full max-w-lg"
            >
              <div>
                <span className="block font-display font-bold text-2xl lg:text-3xl text-white">3+</span>
                <span className="block font-sans text-xs text-slate-500 mt-1">Core Tech Projects</span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl lg:text-3xl text-emerald-400">90%+</span>
                <span className="block font-sans text-xs text-slate-500 mt-1">Voice System Accuracy</span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl lg:text-3xl text-emerald-400/90">60%</span>
                <span className="block font-sans text-xs text-slate-500 mt-1">Chatbot Engagement Gain</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Core Terminal (Col 8-12) */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl glass-panel border border-slate-800 shadow-2xl p-0.5 overflow-hidden group/canvas"
            >
              {/* Header tab buttons */}
              <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80"></span>
                  <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
                  <span className="text-slate-500 font-mono text-[11px] font-medium ml-2">binayak_patri_meta.json</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={copyCode}
                    className="p-1 rounded hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Profile Metadata"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Code Panel */}
              <div className="p-5 font-mono text-xs sm:text-sm text-emerald-300 bg-slate-950/40 overflow-x-auto leading-relaxed h-[240px] flex items-start">
                <pre className="text-left w-full select-all">
                  <code className="block whitespace-pre-wrap sm:whitespace-pre text-[11px] sm:text-xs">
                    {codeString}
                  </code>
                </pre>
              </div>

              {/* Action/Terminal Diagnostic Console */}
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/50">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                    <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Diagnostics Live Monitor</span>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={handleRunSystemAudit}
                      disabled={isAuditing}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                        isAuditing
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40"
                      }`}
                    >
                      <Play className={`h-3 w-3 ${isAuditing ? "animate-pulse" : ""}`} />
                      {isAuditing ? "Running..." : "Test Sandbox"}
                    </button>
                    {!isAuditing && (
                      <button
                        onClick={onOpenSandbox}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] font-semibold tracking-wide uppercase bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-200 cursor-pointer"
                        title="Open interactive sandbox dashboard"
                      >
                        <Cpu className="h-3 w-3 animate-pulse" />
                        Launch UI
                      </button>
                    )}
                  </div>
                </div>

                {isAuditing && (
                  <div className="w-full bg-slate-900 border border-slate-800 rounded-md overflow-hidden h-1.5 mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${auditProgress}%` }}
                      className="bg-emerald-500 h-full"
                    />
                  </div>
                )}

                {/* Audit Terminal Log display */}
                <div className="bg-slate-950 rounded-lg p-2.5 min-h-[96px] max-h-[140px] overflow-y-auto font-mono text-[10px] leading-relaxed text-slate-400 text-left">
                  {auditlogs.length === 0 ? (
                    <div className="text-slate-600 flex flex-col justify-center items-center h-[76px] gap-1.5">
                      <Cpu className="h-6 w-6 text-slate-800" />
                      <span>Diagnostics sandbox offline. Click "Test Sandbox" to verify environments.</span>
                    </div>
                  ) : (
                    auditlogs.map((log, index) => {
                      if (!log) return null;
                      const isComplete = typeof log === "string" && log.includes("[COMPLETED]");
                      const isInfo = typeof log === "string" && log.includes("[INFO]");
                      return (
                        <div key={index} className={`flex tracking-tight select-none mt-1 ${isComplete ? "text-emerald-400 font-bold" : isInfo ? "text-blue-400" : "text-slate-300"}`}>
                          <span className="text-slate-600 mr-2">$</span>
                          <span>{log}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
