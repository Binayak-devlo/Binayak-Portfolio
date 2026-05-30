import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, Check, Copy, ExternalLink, RefreshCw, Star, PlaySquare, ChevronRight, X } from "lucide-react";
// @ts-ignore
import gokuImage from "../assets/images/regenerated_image_1780123250278.png";

interface SandboxProps {
  onClose?: () => void;
}

export const SANDBOX_PROFILE = {
  "engineer": "Binayak Patri",
  "capabilities": ["Full-Stack Web Dev", "Production Support"],
  "mainStack": ["React", "Java", "Node.js", "Python"],
  "databases": ["MongoDB", "MySQL"],
  "currentRole": "Software Support Staff at Nippon Data System Ltd.",
  "status": "Available for High-Impact Roles",
  "activeDiagnostics": true
};

export default function Sandbox({ onClose }: SandboxProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "raw">("dashboard");
  const [sparks, setSparks] = useState<{ id: number; left: number; top: number; dy: number; size: number }[]>([]);

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(JSON.stringify(SANDBOX_PROFILE, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Spark generation loop for Goku Kamehameha beam
  useEffect(() => {
    const interval = setInterval(() => {
      setSparks((prev) => {
        const id = Math.random();
        const size = Math.random() * 4 + 2;
        // Start precisely from hands (135px on mobile, 155px on desktop)
        const isDesktop = window.innerWidth >= 640;
        const left = (isDesktop ? 155 : 135) + (Math.random() - 0.5) * 8;
        const top = 48 + (Math.random() - 0.5) * 8;
        const dy = (Math.random() - 0.5) * 50;
        
        // Keep up to 25 active sparks to avoid performance throttle
        return [...prev.slice(-25), { id, left, top, dy, size }];
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Helper to map technames to Devicons
  const getTechIconClass = (tech: string) => {
    const mapping: Record<string, string> = {
      "React": "devicon-react-original colored",
      "Java": "devicon-java-plain colored",
      "Node.js": "devicon-nodejs-plain colored",
      "Python": "devicon-python-plain colored",
      "MongoDB": "devicon-mongodb-plain colored",
      "MySQL": "devicon-mysql-plain colored"
    };
    return mapping[tech] || "devicon-javascript-plain";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 relative">
      <style>{`
        @keyframes customBeamRise {
          0%, 100% { height: 16px; opacity: 0.92; filter: brightness(1); }
          50% { height: 24px; opacity: 1; filter: brightness(1.2); }
        }

        @keyframes customBeamExpand {
          0% { width: 0; opacity: 0; }
          15% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 1; }
        }

        @keyframes customBeamGlow {
          0%, 100% {
            box-shadow: 
              0 0 15px #ffffff,
              0 0 30px rgba(56, 189, 248, 0.8),
              0 0 60px rgba(56, 189, 248, 0.5),
              0 0 90px rgba(99, 102, 241, 0.4);
          }
          50% {
            box-shadow: 
              0 0 25px #ffffff,
              0 0 45px rgba(56, 189, 248, 1),
              0 0 80px rgba(56, 189, 248, 0.9),
              0 0 120px rgba(99, 102, 241, 0.7);
          }
        }

        @keyframes customRingWave {
          0% {
            width: 8px;
            height: 8px;
            opacity: 0.95;
            border-width: 5px;
            filter: blur(0px);
          }
          50% {
            opacity: 0.5;
            border-width: 2px;
            filter: blur(1.5px);
          }
          100% {
            width: 380px;
            height: 380px;
            opacity: 0;
            border-width: 0.5px;
            filter: blur(4px);
          }
        }

        @keyframes auraVibrate {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          10% {
            transform: translate(-1px, 1px) scale(0.99) rotate(-0.5deg);
          }
          20% {
            transform: translate(1px, -1px) scale(1.01) rotate(0.5deg);
          }
          30% {
            transform: translate(-1.5px, -0.5px) scale(0.995) rotate(-0.2deg);
          }
          40% {
            transform: translate(1.5px, 1px) scale(1.005) rotate(0.3deg);
          }
          50% {
            transform: translate(-1px, -1px) scale(1) rotate(-0.4deg);
          }
          60% {
            transform: translate(1px, 1.5px) scale(1.01) rotate(0.1deg);
          }
          70% {
            transform: translate(-1.5px, 1px) scale(0.99) rotate(-0.3deg);
          }
          85% {
            transform: translate(1px, -1.5px) scale(1.005) rotate(0.4deg);
          }
          90% {
            transform: translate(-0.5px, -1px) scale(0.995) rotate(-0.1deg);
          }
        }

        @keyframes customGokuLevitate {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .react-goku-levitate {
          animation: customGokuLevitate 4s ease-in-out infinite;
        }

        .goku-vibrate {
          animation: auraVibrate 0.15s ease-in-out infinite;
          filter: drop-shadow(0 0 25px rgba(96, 165, 250, 0.65)) drop-shadow(0 0 50px rgba(255, 255, 255, 0.25));
        }

        .react-energy-beam {
          position: absolute;
          top: 48%;
          left: 135px;
          width: calc(100% - 135px);
          height: 20px;
          background: linear-gradient(to right, 
            #ffffff 0%, 
            #e0f2fe 12%, 
            #a7f3d0 32%, 
            #38bdf8 68%, 
            #6366f1 100%
          );
          border-radius: 9999px;
          z-index: 10;
          transform-origin: left center;
          animation: 
            customBeamExpand 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards,
            customBeamRise 0.12s linear infinite,
            customBeamGlow 0.8s ease-in-out infinite;
        }

        @media (min-width: 640px) {
          .react-energy-beam {
            left: 155px;
            width: calc(100% - 155px);
          }
        }

        .react-ki-ring {
          position: absolute;
          top: 48%;
          left: 135px;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid rgba(56, 189, 248, 0.75);
          transform: translate(-50%, -50%);
          animation: customRingWave 2.4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
          pointer-events: none;
          z-index: 15;
        }

        @media (min-width: 640px) {
          .react-ki-ring {
            left: 155px;
          }
        }

        .react-spark {
          position: absolute;
          background: #ffffff;
          border-radius: 50%;
          pointer-events: none;
          z-index: 12;
          opacity: 0.8;
          transition: transform 1.2s linear, opacity 1.2s linear;
        }
      `}</style>

      {/* Close trigger if managed inside a modal */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer z-20"
          title="Exit Sandbox"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Header Panel */}
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-900">
        <div className="text-left">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            ACTIVE DESKTOP SANDBOX
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Developer Sandbox
          </h2>
        </div>
        <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("raw")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all cursor-pointer ${
              activeTab === "raw"
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Raw JSON
          </button>
        </div>
      </div>

      {/* Dynamic Tabs Display */}
      <div className="space-y-8 text-left">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-panel border border-emerald-500/10 rounded-2xl p-6 sm:p-8 bg-[#0a0f1e]/85 shadow-2xl relative overflow-hidden"
            >
              {/* Card visual elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.02] rounded-full filter blur-[80px] pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-1 font-semibold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    Diagnostics Core Status
                  </span>
                  <h3 className="font-display font-black text-2xl text-white tracking-tight">
                    {SANDBOX_PROFILE.engineer}
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/25 rounded-xl px-4 py-2 self-start md:self-auto">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-mono text-xs text-emerald-350 font-bold">
                    {SANDBOX_PROFILE.status}
                  </span>
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850/80">
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1.5 flex items-center gap-1 font-semibold">
                      <Terminal className="h-3 w-3 text-emerald-400" /> Current Command Position
                    </span>
                    <p className="font-semibold text-slate-200 font-sans leading-normal">
                      {SANDBOX_PROFILE.currentRole}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850/80">
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-2 font-semibold">
                      Core Software Capabilities
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {SANDBOX_PROFILE.capabilities.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850/80">
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-2 font-semibold">
                      Main Tech Stack (Devicons React Mode)
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {SANDBOX_PROFILE.mainStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-250 font-semibold flex items-center gap-1.5"
                        >
                          <i className={`${getTechIconClass(tech)} text-sm flex items-center`} />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850/80">
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-2 font-semibold">
                      Persisted Databases
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {SANDBOX_PROFILE.databases.map((db) => (
                        <span
                          key={db}
                          className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-250 font-semibold flex items-center gap-1.5"
                        >
                          <i className={`${getTechIconClass(db)} text-sm flex items-center`} />
                          {db}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="raw"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-panel border border-slate-800 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4 border-b border-slate-850 pb-3">
                <span className="text-xs font-mono uppercase text-indigo-400 block font-semibold">
                  application/json response
                </span>
                <button
                  onClick={handleCopyRaw}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-350 hover:text-white transition-all cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Payload"}
                </button>
              </div>
              <pre className="font-mono text-xs text-emerald-300 bg-slate-950/80 p-5 rounded-xl overflow-x-auto leading-relaxed h-[240px]">
                {JSON.stringify(SANDBOX_PROFILE, null, 2)}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ULTRA INSTINCT GOKU CONTINUOUS KAMEHAMEHA VISUALIZER CARD */}
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-950/80 to-slate-950/40 border border-slate-850 p-6 flex flex-col items-center justify-between min-h-[440px] overflow-hidden shadow-2xl">
          {/* Subtle star matrix patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(56,189,248,0.05)_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none opacity-50"></div>

          <div className="text-center mb-4 z-20">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#60a5fa] bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full inline-block font-semibold">
              CSS Particle Rendering Output
            </span>
            <h4 className="font-display font-bold text-white text-base sm:text-lg mt-2.5 tracking-tight">
              Kamehameha Continuous Output Visualization
            </h4>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              CSS Keyframes rendering continuous Ultra Instinct power rays
            </p>
          </div>

          {/* Core Beam Containment Stage */}
          <div className="w-full h-[260px] relative flex items-center justify-start mt-4 px-2 sm:px-10 overflow-hidden">
            
            {/* Levitate wrapper that moves BOTH goku and the beam elements up and down gracefully together! */}
            <div className="w-full h-full relative flex items-center justify-start react-goku-levitate">

              {/* The continuous energy ray blast */}
              <div className="react-energy-beam" />

              {/* Expansive Ki Shockwave ripples */}
              <div className="react-ki-ring" style={{ animationDelay: "0s" }} />
              <div className="react-ki-ring" style={{ animationDelay: "1.2s" }} />

              {/* Flare glowing clusters around emission hub */}
              <div className="absolute top-[48%] left-[135px] sm:left-[155px] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-sky-100 filter blur-md mix-blend-screen opacity-90 z-20" />
              <div className="absolute top-[48%] left-[135px] sm:left-[155px] -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-blue-500 filter blur-xl mix-blend-screen opacity-45 z-20 animate-pulse" />

              {/* Ultra Instinct Goku form */}
              <div className="absolute left-0 z-30 flex items-center justify-center">
                <img
                  className="goku-vibrate h-44 w-44 sm:h-48 sm:w-48 object-contain"
                  referrerPolicy="no-referrer"
                  src={gokuImage}
                  alt="Goku Ultra Instinct"
                />
              </div>

              {/* Spark nodes mapping to recreate high energy discharge */}
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                {sparks.map((s) => (
                  <div
                    key={s.id}
                    className="react-spark font-sans"
                    style={{
                      width: `${s.size}px`,
                      height: `${s.size}px`,
                      left: `${s.left}px`,
                      top: `${s.top}%`,
                      transform: `translate(0px, 0px) scale(1)`,
                      opacity: 0,
                      transition: "transform 1.3s cubic-bezier(0.1, 0.7, 0.2, 1), opacity 1.3s ease",
                    }}
                    ref={(el) => {
                      if (el) {
                        // Trigger GPU animate translate transition immediately after paint
                        requestAnimationFrame(() => {
                          el.style.transform = `translate(420px, ${s.dy}px) scale(0.2)`;
                          el.style.opacity = "1";
                        });
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
