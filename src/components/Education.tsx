import { motion } from "motion/react";
import { EDUCATION_HISTORY } from "../data";
import { GraduationCap, Award, Calendar, BookOpen, Layers } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 bg-slate-950/20 border-y border-slate-900 relative">
      <div className="absolute top-[30%] left-[10%] w-[350px] h-[350px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase font-mono">Academic Achievement</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Education Credentials
          </p>
          <div className="mt-4 h-1 w-12 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 font-sans text-sm sm:text-base">
            Verified academic qualifications in Computer Application and Information Technology, with rigorous focus on high software engineering standards.
          </p>
        </div>

        {/* Master & BSc Grid Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {EDUCATION_HISTORY.map((edu) => {
            const numGpa = parseFloat(edu.gpa);
            const gpaPercent = (numGpa / parseFloat(edu.gpaScale)) * 100;
            const isMca = edu.id === "mca";

            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8 text-left transition-colors hover:border-slate-700/60 flex flex-col justify-between min-h-[420px]"
              >
                <div>
                  {/* Top line with calendar and cap */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center text-emerald-400">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <span className="text-slate-500 font-mono text-xs flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {edu.period}
                    </span>
                  </div>

                  {/* Degree and organization */}
                  <h3 className="font-display font-extrabold text-xl text-white tracking-tight leading-tight mb-2">
                    {edu.degree}
                  </h3>
                  <p className="font-display font-medium text-sm text-emerald-400 mb-6 font-semibold">
                    {edu.institution}
                  </p>

                  {/* Visual GPA Widget (Circular Progress gauge simulation) */}
                  <div className="flex items-center gap-4 py-4 px-4 bg-slate-950/40 rounded-xl border border-slate-850/80 mb-6">
                    <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
                      {/* SVG Gauge circle */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          className="stroke-slate-800"
                          strokeWidth="4.5"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="28"
                          cy="28"
                          r="24"
                          className={isMca ? "stroke-emerald-500" : "stroke-teal-400"}
                          strokeWidth="4.5"
                          fill="transparent"
                          strokeDasharray={150} // approximate circumference
                          initial={{ strokeDashoffset: 150 }}
                          whileInView={{ strokeDashoffset: 150 - (150 * gpaPercent) / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </svg>
                      <span className="absolute font-mono font-bold text-[12px] text-white">
                        {edu.gpa}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">System Score</span>
                      <span className="font-display font-bold text-sm text-slate-300">
                        GPA: {edu.gpa} / {edu.gpaScale}.0 scale
                      </span>
                    </div>
                  </div>

                  {/* Coursework pill metrics */}
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5 font-semibold">
                      <BookOpen className="h-3.5 w-3.5 text-emerald-400" /> RELEVANT COURSEWORK:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.relevantCoursework.map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 rounded bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800/85"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/60 text-slate-500 text-[10px] font-mono flex justify-between items-center">
                  <span>REGISTRATION: APB-BPUT</span>
                  <span className="text-emerald-400">CREDENTIAL VERIFIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
